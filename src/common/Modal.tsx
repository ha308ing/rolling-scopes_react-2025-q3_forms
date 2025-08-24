import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  closeHandler: () => void;
}

function Modal({ children, closeHandler }: ModalProps) {
  const modalElement = document.getElementById("modal");
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.code === "Escape" || event.key === "Escape") {
        closeHandler();
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (event.target === modalRef.current) {
        event.stopPropagation();
      }
      if (event.target === containerRef.current) {
        closeHandler();
      }
    };

    window.addEventListener("keyup", handleEsc);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keyup", handleEsc);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return createPortal(
    <div
      className="w-[100vw] h-[100vh] fixed inset-0 bg-white/90 bg-blend-lighten flex flex-col items-center"
      ref={containerRef}
    >
      <div className="top-[10vh] relative" ref={modalRef}>
        {children}
      </div>
    </div>,

    modalElement!,
  );
}

export default Modal;
