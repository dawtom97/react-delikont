import ModalBackdrop from './ModalBackdrop'
import { motion } from 'framer-motion';
import styles from './Modal.module.css'
import { Button } from '../Button';
import Image from 'next/image';
import logo from "../../../public/logo.png";
import { Input } from '../Input';
import { zipCodes } from '../../variables/zipCodes';
import { useState } from 'react';

const dropIn = {
    hidden: {
   
      opacity: 0,
    },
    visible: {
    
      opacity: 1,
      
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
    
      opacity: 0,
    },
  };
  

const Modal = ({ handleClose, text }) => {

    const [myCode, setMyCode] = useState("");
    const [message, setMessage] = useState("")

    const checkCode = (e) => {
       const codeExists = zipCodes.find(item => item === myCode)
       return codeExists ? setMessage("Kod znajduje się na liście i możemy dostarczyć towar") : setMessage("Niestety nie obsługujemy wskazanego regionu")
    }

    return (
      <ModalBackdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}  
            className={styles.modal}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2>Witamy w hurtowni internetowej</h2>
            <Image src={logo} alt="delikont logo"/>
            <p>Oferta skierowana dla sklepów, restauracji, biur, firm, zakładów pracy, szkół, uczelni, przedszkoli, urzedów i instytucji państwowych.</p>
            <p className={styles.checkText}>Sprawdź czy możemy dostarczyć do Ciebie towar</p>
            <input onChange={(e)=>setMyCode(e.target.value)} className={styles.field} placeholder='Podaj kod pocztowy'/>
            <br/>
            {message ? <p className={styles.message}>{message}</p> : null}

            <div className={styles.btns}>
            <Button onClick={(e)=>checkCode(e)}>Sprawdź</Button>
            <Button onClick={handleClose} isSecondary>Zamknij</Button>
            </div>
          </motion.div>
      </ModalBackdrop>
    );
  };

  
  export default Modal;