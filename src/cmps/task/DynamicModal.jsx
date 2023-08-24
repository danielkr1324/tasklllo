import { useRef } from "react"
import { useClickOutside } from "../../costumeHooks/useClickOutside"
import { TaskCoverModal } from "./task-edit-modals/TaskCoverModal"
import { TaskChecklistModal } from "./task-edit-modals/TaskChecklistModal"
import { TaskLabelModal } from "./task-edit-modals/TaskLabelModal"
import { TaskDateModal } from "./task-edit-modals/TaskDateModal"

export function DynamicModal({task, submitTaskEdit, sideBarModalType, setSideBarModalType, labels, boardLabelsUpdate, refBtn}) {

    const modalRef = useRef(null)

    useClickOutside(modalRef, setSideBarModalType)

    function getModalPos(refBtn) {
        const modalPos = {};
        const rect = refBtn.current.getBoundingClientRect();
        const modalWidth = 350; 
        const modalHeight = 400; 
      
        const isSmallScreen = window.innerWidth <= 768;
        const centerY = (window.innerHeight - modalHeight) / 2;
        const centerX = (window.innerWidth - modalWidth) / 2;
      
        if (isSmallScreen) {
          modalPos.top = centerY;
          modalPos.left = centerX;
          modalPos.position = 'fixed';
        } else {
          let topModal = rect.top + rect.height + 10;
          let bottomModal = '';
          let leftModal = rect.left;
          let rightModal = rect.right;
          let position = 'fixed';
      
          if (rect.y <= 10) {
            topModal = rect.top + rect.height + 10;
          } else if (window.innerHeight < rect.top + modalHeight + 10) {
            bottomModal = 10;
          }
      
          if (window.innerWidth < rect.left + modalWidth) {
            leftModal = '';
            rightModal = 20;
          }
      
          modalPos.top = Math.min(topModal, window.innerHeight - modalHeight - 10);
          modalPos.bottom = bottomModal;
          modalPos.left = leftModal;
          modalPos.right = rightModal;
          modalPos.position = position;
        }
      
        return modalPos;
      }
      
    return (
        <section ref={modalRef} style={getModalPos(refBtn)} className="dynamic-modal">
            <button onClick={() => setSideBarModalType('')} className="btn-close"><i className="fa-solid fa-x"></i></button>
            {sideBarModalType === 'TaskCoverModal' &&
                <TaskCoverModal 
                task={task}
                submitTaskEdit={submitTaskEdit}
                />}

            {sideBarModalType === 'TaskChecklistModal' &&
                <TaskChecklistModal 
                task={task}
                submitTaskEdit={submitTaskEdit}
                />}

            {sideBarModalType === 'TaskLabelModal' &&
                <TaskLabelModal 
                task={task}
                submitTaskEdit={submitTaskEdit}
                labels={labels}
                boardLabelsUpdate={boardLabelsUpdate}
                />}

            {sideBarModalType === 'TaskDateModal' &&
                <TaskDateModal 
                task={task}
                submitTaskEdit={submitTaskEdit}
                />}
        </section>
    )
}