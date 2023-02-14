import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

function Home() {
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <Button onClick={navigateToLogin}>Log in</Button>
        </div>
    );
}

export default Home;