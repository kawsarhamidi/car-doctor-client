import { useContext } from "react";
import { AuthContext } from "../../../Providers/Authprovider";


const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const handelGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => console.log(error))
    }
    return (
        <div>
            <div className="divider">OR</div>
            <div className="text-center">
                <button onClick={handelGoogleSignIn} className="btn btn-circle btn-outline">
                    G
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;