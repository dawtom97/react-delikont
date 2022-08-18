import { createContext, useState } from "react";
import { Modal } from "../components/Modal";



export const ModalContext = createContext();


export const ModalContextProvider = ({children}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [isError, setIsError] = useState(false);

    const hideModal = () => {
        setTimeout(()=>{
             setIsModalVisible(false)
        },2000)
    }

    const showModal = (msg, errorValue) => {
        setIsModalVisible(true);
        setModalMsg(msg)
        setIsError(errorValue)
        hideModal()
    }

    const value = {
        isModalVisible,
        setIsModalVisible,
        showModal
    }
    
    return (
        <ModalContext.Provider value={value}>
            {isModalVisible ? <Modal msg={modalMsg} isError={isError}/> : null}
            {children}
        </ModalContext.Provider>
    )
}