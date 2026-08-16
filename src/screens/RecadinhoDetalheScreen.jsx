import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './RecadinhoDetalheScreen.module.css';
import { BackButton } from '../components/common/BackButton';
import { Button } from '../components/common/Button';
import { useDiario } from '../hooks/useDiario';
import { useCountdown } from '../hooks/useCountdown';
import { enviarRecadinho } from '../services/sheetdb';
import { vibrate } from '../hooks/useVibration';

export function RecadinhoDetalheScreen() {
  const { byDate, refetch } = useDiario();
  const { hojeISO } = useCountdown();
  const entry = byDate[hojeISO];

  const [texto, setTexto] = useState(entry?.respostaDela ?? '');
  const [status, setStatus] = useState('idle'); // idle | enviando | enviado | erro

  async function handleEnviar() {
    const valor = texto.trim();
    if (!valor || status === 'enviando') return;
    setStatus('enviando');
    try {
      await enviarRecadinho(hojeISO, valor);
      vibrate([15, 40, 15]);
      setStatus('enviado');
      refetch();
    } catch {
      setStatus('erro');
    }
  }

  function handleChange(event) {
    setTexto(event.target.value);
    if (status !== 'idle') setStatus('idle');
  }

  return (
    <div className={styles.screen}>
      <BackButton />
      <div className={styles.conteudo}>
        <textarea
          className={styles.campo}
          value={texto}
          onChange={handleChange}
          placeholder="Digite um recadinho aqui..."
          rows={8}
        />

        <AnimatePresence mode="wait" initial={false}>
          {status === 'enviado' ? (
            <motion.span
              key="selo"
              className={styles.seloEnviado}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              Enviado com sucesso! 💕
            </motion.span>
          ) : (
            <motion.div key="botao" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Button onClick={handleEnviar} disabled={!texto.trim() || status === 'enviando'}>
                {status === 'enviando' ? 'Enviando...' : 'Enviar Amor'}
              </Button>
              {status === 'erro' && (
                <p className={styles.erro}>Não consegui enviar agora, tenta de novo em instantes.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
