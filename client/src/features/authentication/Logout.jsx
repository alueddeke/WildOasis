// import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
// import ButtonIcon from "../../ui/ButtonIcon";

// function Logout() {
//   return (
//     <ButtonIcon>
//       <HiArrowRightEndOnRectangle />
//     </ButtonIcon>
//   );
// }

// export default Logout;

import { HiArrowPath, HiArrowRightEndOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import Modal from "../../ui/Modal";
import ConfirmResetDatabase from "../../ui/ConfirmResetDatabase";

function Logout() {
  return (
    <Modal>
      <Modal.Open opens="resetDatabaseModal">
        <ButtonIcon>
          <HiArrowPath />
        </ButtonIcon>
      </Modal.Open>

      <Modal.Window name="resetDatabaseModal">
        <ConfirmResetDatabase />
      </Modal.Window>
    </Modal>
  );
}

export default Logout;
