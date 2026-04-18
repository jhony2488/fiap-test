'use client';
import { BASE_PATH, FILE_EXT, TOTAL_FRAMES } from '@/utils/consts';
import { useEffect, useRef, useState } from 'react';
import "./waterScrollAnimation.scss";

export function WaterScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Pré-carregamento das Imagens (Boa Energia para a Performance)
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      // Formata o número: 0 -> "000", 1 -> "001", 10 -> "010", etc.
      const frameNumber = i.toString().padStart(3, '0');
      img.src = `${BASE_PATH}${frameNumber}${FILE_EXT}`;

      img.onload = () => {
        loadedCount++;
        // Quando a última imagem carregar, libera a animação
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoading(false);
          // Desenha o primeiro frame imediatamente
          renderFrame(0);
        }
      };

      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // 2. Função de Renderização do Canvas (O Mago dos Pixels)
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (context && images[index] && images[index].complete) {
      const img = images[index];

      // Limpa o canvas anterior
      context.clearRect(0, 0, canvas!.width, canvas!.height);

      // Desenha a imagem centralizada e cobrindo o canvas (efeito "cover")
      const scale = Math.max(canvas!.width / img.width, canvas!.height / img.height);
      const x = (canvas!.width / 2) - (img.width / 2) * scale;
      const y = (canvas!.height / 2) - (img.width / 3) * scale;

      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  };

  // 3. Lógica do Scroll Ligada ao Progresso (O Eremita)
  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || !sectionRef.current || !canvasRef.current || images.length === 0) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Início da animação: Quando o topo do elemento chega na metade da tela
      const start = windowHeight/2.1;
      // Fim da animação: Quando o elemento preenche a tela (topo chega no zero)
      const end = 0;

      const rawProgress = (start - rect.top) / (start - end);

      // Garante que o valor fique entre 0 e 1 (Clamp)
      const scrollFraction = Math.max(0, Math.min(1, rawProgress));

      const frameIndex = Math.floor(scrollFraction * (TOTAL_FRAMES - 1));

      requestAnimationFrame(() => renderFrame(frameIndex));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Executa uma vez no carregamento para posicionar
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, images]);

  return (
    <section
      ref={sectionRef}
      className="water-animation-section"
      style={{ height: '100vh', background: '#09090d' }} // 300vh dá "respiro" para o scroll
      aria-hidden
    >
      <div className="water-canvas-container">
        {isLoading && (
          <div className="water-loading">Carregando Animação...</div>
        )}
        <canvas
          ref={canvasRef}
          width={1920} // Resolução nativa da imagem
          height={1080}
          style={{
            width: '100%', // Ocupa a largura do container pai
            height: 'auto',
            opacity: isLoading ? 0 : 1, // Esconde enquanto carrega
            transition: 'opacity 0.5s ease'
          }}
        />
      </div>
    </section>
  );
}