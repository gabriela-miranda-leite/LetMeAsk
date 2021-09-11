import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';
import toast from "react-hot-toast";

type RoomCodeProps = {
    code: string;
}

export const RoomCode = (props:RoomCodeProps) =>{

    function copyRoomCodeClipboard(){
        navigator.clipboard.writeText(props.code);
        toast.success("Código da sala copiado!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
    }
    return(
        <button className="room-code" onClick={copyRoomCodeClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    );
}