import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  increment, 
  arrayUnion, 
  serverTimestamp 
} from 'firebase/firestore';

// Initial seed questions for the forum
export const INITIAL_FORUM_QUESTIONS = [
  {
    id: 'seed-q1',
    title: '¿Cuál es el coste estimado de infraestructuras OPS de media tensión (6.6 kV / 11 kV) para dársenas pesqueras frente a terminales Ro-Ro?',
    author: 'Ing. Carlos Souto',
    role: 'Ingeniero Naval, Armadores del Atlántico',
    category: 'ops',
    sessionRef: 'Suministro de energía en puerto (OPS)',
    content: 'En puertos como el de Vigo, la simultaneidad de descarga y refrigeración de la flota congeladora exige potencias punta elevadas. ¿Se prevén ayudas del mecanismo CEF Transport para la conexión en muelle de buques de eslora menor a 50m?',
    upvotes: 24,
    upvotedBy: ['demo-user-1', 'demo-user-2'],
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    isAnswered: true,
    comments: [
      {
        id: 'c1-1',
        author: 'Dpto. Infraestructuras (AP Vigo)',
        role: 'Autoridad Portuaria de Vigo',
        text: 'En el marco de la estrategia Green Port, la fase 2 incluye subestaciones modulares en Bouzas con financiación FEDER y fondos MRR, con tarifas bonificadas T1/T2 para buques electrificados.',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      }
    ]
  },
  {
    id: 'seed-q2',
    title: 'Metanol verde vs. Amoníaco: ¿Qué vector ofrece mejor viabilidad técnico-económica para buques de navegación costera y Gran Sol?',
    author: 'Dra. Helena Varela',
    role: 'Investigadora en Propulsión Marina, CIM-UVigo',
    category: 'combustibles',
    sessionRef: 'Combustibles alternativos en el sector naval',
    content: 'Considerando la toxicidad del amoníaco (código IGC / IGF) y la penalización de volumen del hidrógeno comprimido, el e-metanol parece tener ventaja a corto plazo, pero ¿qué disponibilidad de bunker e-fuel existirá en la fachada atlántica para 2030?',
    upvotes: 38,
    upvotedBy: ['demo-user-1'],
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    isAnswered: false,
    comments: [
      {
        id: 'c2-1',
        author: 'GHENOVA Naval Engineering',
        role: 'Oficina Técnica',
        text: 'Se tratará en detalle durante la conferencia de las 15:00h en la Jornada 2. Presentaremos el estudio de caso para buques de 70m.',
        createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      }
    ]
  },
  {
    id: 'seed-q3',
    title: 'Mesa Javier Touza: Viabilidad real de descarbonizar buques arrastreros de altura sin sacrificar volumen de bodega refrigerada',
    author: 'Marcos Rial',
    role: 'Patrón Mayor y Armador de Palangre',
    category: 'pesca',
    sessionRef: 'Mesa Redonda: Descarbonización del Sector Naval (Flota Pesquera)',
    content: 'Un buque congelador que opera en Malvinas o Mauritania no puede perder un 30% de capacidad de carga para instalar tanques de hidrógeno criogénico o baterías pesadas. ¿Qué soluciones intermedias de hibridación con diésel renovable (HVO) o velas rígidas son viables hoy?',
    upvotes: 45,
    upvotedBy: [],
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    isAnswered: false,
    comments: []
  },
  {
    id: 'seed-q4',
    title: 'Integración de eólica flotante y generación de H2 verde offshore en aguas gallegas y cantábricas',
    author: 'Lucía Míguez',
    role: 'Project Manager Offshore Wind',
    category: 'renovables',
    sessionRef: 'Energías renovables marinas',
    content: '¿Cómo se resolverá la compatibilidad del espacio marítimo entre los polígonos eólicos marinos (POEM) y los caladeros tradicionales de la flota artesanal?',
    upvotes: 19,
    upvotedBy: [],
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    isAnswered: false,
    comments: []
  }
];

// Firebase configuration detection
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const isConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey !== 'AIzaSyExampleKey123456789'
);

let db = null;
let app = null;

if (isConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    console.log('⚡ Firebase Cloud Firestore inicializado correctamente para IBERNAÚTICA 27');
  } catch (err) {
    console.warn('⚠️ Error al inicializar Firebase, cambiando a modo LocalStorage Offline:', err);
    db = null;
  }
} else {
  console.log('ℹ️ Modo LocalStorage activo (Variables Firebase no configuradas o en entorno local)');
}

export const isFirebaseActive = () => Boolean(db);

// Storage key for local persistence fallback
const LOCAL_STORAGE_KEY = 'ibernautica27_forum_v1';
const LOCAL_REG_KEY = 'ibernautica27_registrations_v1';

// In-memory event dispatcher for instant real-time sync across components in local mode
const localSubscribers = new Set();

function notifySubscribers() {
  const current = getLocalQuestions();
  localSubscribers.forEach(cb => {
    try {
      cb(current);
    } catch (e) {
      console.error(e);
    }
  });
}

function getLocalQuestions() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_FORUM_QUESTIONS));
      return INITIAL_FORUM_QUESTIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_FORUM_QUESTIONS;
  }
}

function saveLocalQuestions(questions) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(questions));
    notifySubscribers();
  } catch (err) {
    console.error('Error guardando en LocalStorage:', err);
  }
}

// 1. Subscribe to forum questions
export function subscribeToForumQuestions(callback) {
  if (db) {
    const q = query(collection(db, 'forum_questions'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const questions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toISOString() : doc.data().createdAt
      }));
      callback(questions.length > 0 ? questions : INITIAL_FORUM_QUESTIONS);
    }, (error) => {
      console.warn('Firestore fallback on error:', error);
      callback(getLocalQuestions());
    });
  } else {
    // Initial emission
    callback(getLocalQuestions());
    localSubscribers.add(callback);
    return () => {
      localSubscribers.delete(callback);
    };
  }
}

// 2. Submit new question
export async function submitQuestion({ title, author, role, category, sessionRef, content }) {
  const newQuestionData = {
    title: title.trim(),
    author: author.trim() || 'Asistente Anónimo',
    role: role.trim() || 'Congresista Naval',
    category: category || 'general',
    sessionRef: sessionRef || 'Jornadas Generales',
    content: content.trim(),
    upvotes: 1,
    upvotedBy: ['creator'],
    isAnswered: false,
    comments: [],
    createdAt: new Date().toISOString()
  };

  if (db) {
    try {
      const docRef = await addDoc(collection(db, 'forum_questions'), {
        ...newQuestionData,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (err) {
      console.warn('Fallo al escribir en Firestore, guardando localmente:', err);
    }
  }

  // LocalStorage Fallback
  const current = getLocalQuestions();
  const createdQuestion = {
    ...newQuestionData,
    id: 'local-q-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6)
  };
  saveLocalQuestions([createdQuestion, ...current]);
  return { success: true, id: createdQuestion.id };
}

// 3. Upvote a question (toggle)
export async function toggleVoteQuestion(questionId, userId = 'user-local') {
  if (db) {
    try {
      const qRef = doc(db, 'forum_questions', questionId);
      // Simple atomic increment in Firestore
      await updateDoc(qRef, {
        upvotes: increment(1),
        upvotedBy: arrayUnion(userId)
      });
      return { success: true };
    } catch (err) {
      console.warn('Error en updateDoc Firestore:', err);
    }
  }

  // LocalStorage fallback
  const current = getLocalQuestions();
  const updated = current.map(q => {
    if (q.id === questionId) {
      const hasVoted = (q.upvotedBy || []).includes(userId);
      const newUpvotedBy = hasVoted
        ? q.upvotedBy.filter(u => u !== userId)
        : [...(q.upvotedBy || []), userId];
      return {
        ...q,
        upvotes: hasVoted ? Math.max(0, q.upvotes - 1) : q.upvotes + 1,
        upvotedBy: newUpvotedBy
      };
    }
    return q;
  });
  saveLocalQuestions(updated);
  return { success: true };
}

// 4. Add comment/reply to a question
export async function addCommentToQuestion(questionId, { author, role, text }) {
  const newComment = {
    id: 'comment-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
    author: author.trim() || 'Delegado Naval',
    role: role.trim() || 'Participante',
    text: text.trim(),
    createdAt: new Date().toISOString()
  };

  if (db) {
    try {
      const qRef = doc(db, 'forum_questions', questionId);
      await updateDoc(qRef, {
        comments: arrayUnion(newComment)
      });
      return { success: true, comment: newComment };
    } catch (err) {
      console.warn('Error añadiendo comentario en Firestore:', err);
    }
  }

  // Local fallback
  const current = getLocalQuestions();
  const updated = current.map(q => {
    if (q.id === questionId) {
      return {
        ...q,
        comments: [...(q.comments || []), newComment]
      };
    }
    return q;
  });
  saveLocalQuestions(updated);
  return { success: true, comment: newComment };
}

// 5. Pre-register attendee
export async function saveRegistration(registrationData) {
  const regPayload = {
    ...registrationData,
    registeredAt: new Date().toISOString(),
    id: 'IB27-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  };

  if (db) {
    try {
      await addDoc(collection(db, 'registrations'), {
        ...regPayload,
        serverTimestamp: serverTimestamp()
      });
    } catch (e) {
      console.warn('Registration cloud error, saving locally:', e);
    }
  }

  try {
    const raw = localStorage.getItem(LOCAL_REG_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.push(regPayload);
    localStorage.setItem(LOCAL_REG_KEY, JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }

  return { success: true, registration: regPayload };
}
