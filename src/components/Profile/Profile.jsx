import { useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";

const Profile = () => {
    const {userC} = useContext(AuthContext);

    const {displayName, email, photoURL} = userC ? userC : {};
    return (
        <div>
            <div className="flex flex-col justify-center items-center">
            <div>
                <img src={photoURL} alt=""  className="rounded-2xl"/>
            </div>
            <h4><span>Name: </span> {displayName}</h4>
            <p>{email}</p>
            </div>
        </div>
    );
};

export default Profile;