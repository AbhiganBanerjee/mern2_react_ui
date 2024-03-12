import React, { useState } from "react";
import { Button, Container, IconButton, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CheckBox, DarkMode, LightMode } from "@mui/icons-material";

const InsertNewAnime = () => {

    //manage a state for theme change
    const[isThemeClick,setIsThemeClick] = useState(false);

    const themeClick = ()=>{
        setIsThemeClick(!isThemeClick);
    }

    return(
        <div className="container-fluid">
            <header className="text-center text-bg-white text-danger p-2">
                <h4 style={{border:"2px solid red"}} className="fs-7 fw-bolder font-monospace">Insert New Anime Details Here</h4>
            </header>
            <Container  maxWidth="md" className="mt-1">
                <Container
                    maxWidth="xs"
                    className={isThemeClick ? "border text-bg-dark rounded p-4" : "border text-bg-warning rounded p-4"}
                    style={{ border: "2px solid red" }}
                >
                    <div className="text-center form-switch">
                        <h4 className={!isThemeClick? "fw-bolder text-dark fst-italic font-monospace text-center" : "fw-bolder text-warning fst-italic font-monospace text-center"}>
                            <IconButton className={!isThemeClick ? "text-center text-dark" : "text-center text-warning"} onClick={themeClick}>{!isThemeClick ? <DarkMode/> : <LightMode/>}</IconButton>Change Theme</h4>
                    </div>
                    <form className="fst-italic" method="POST" action="https://mern2-node-mongo.onrender.com/insertAnimes">
                        <TextField  
                            color={!isThemeClick ? "error" : "warning"}
                            type="number"
                            name="id"
                            variant="standard"
                            size="large"
                            label="Anime ID"
                            fullWidth
                            
                            className="mb-3"
                            required
                            focused
                        />
                        <TextField
                            color={!isThemeClick ? "error" : "warning"}
                            type="text"
                            name="title"
                            variant="standard"
                            size="large"
                            label="Anime Title"
                            
                            fullWidth
                            className="mb-3"
                            required
                            focused
                        />
                        <TextField
                            color={!isThemeClick ? "error" : "warning"}
                            type="text"
                            name="protagonist"
                            variant="standard"
                            size="large"
                            label="Anime Protagonist"
                            
                            fullWidth
                            className="mb-3"
                            required
                            focused
                        />
                        <TextField
                            color={!isThemeClick ? "error" : "warning"}
                            type="number"
                            name="price"
                            variant="standard"
                            size="large"
                            label="Anime Price"
                            
                            fullWidth
                            className="mb-3"
                            required
                            focused
                        />
                        <TextField
                            color={!isThemeClick ? "error" : "warning"}
                            type="text"
                            name="author"
                            variant="standard"
                            size="large"
                            label="Anime Author"
                            
                            fullWidth
                            className="mb-3"
                            required
                            focused
                        />
                        <TextField
                            color={!isThemeClick ? "error" : "warning"}
                            type="url"
                            name="image"
                            variant="standard"
                            size="large"
                            label="Anime Image_URL"
                            
                            fullWidth
                            className="mb-3"
                            required
                            focused
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            size="medium"
                            startIcon={<AddIcon />}
                            fullWidth
                            className={!isThemeClick ? "text-bg-dark text-warning mt-3" : "text-bg-warning text-dark mt-3"}
                        >
                            <b className="fs-6 fw-bolder fst-italic font-monospace">Insert</b>
                        </Button>
                    </form>
                </Container>
            </Container>
        </div>
    );
};

export default InsertNewAnime;