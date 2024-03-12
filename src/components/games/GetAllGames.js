import { AddShoppingCart, Bookmark, BookmarkBorderOutlined, ChevronLeft, ChevronRight, Close, Favorite, FavoriteBorder, MoreHoriz, PauseCircleFilled, PlayCircleFilled, SendOutlined, SendSharp, ShoppingCart } from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent, DialogActions, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, CssBaseline, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const GetAllGames = ()=>{   

    //Get the Games from the API Call
    const[games,setGames] = useState([{}]);
    const[idx,setIdx] = useState(0);
    const[len,setLen] = useState(0);
    const[timer,setTimer] = useState(0);

    //Create the states for toogling buttons
    const[isFavClick,setIsFavClick] = useState(false);
    const[isCartClick,setIsCartClick] = useState(false);
    const[isSendClick,setIsSendClick] = useState(false);
    const[isPpClick,setIsPpClick] = useState(false);
    const[isBookClick,setIsBookClick] = useState(false);

    // Create states for managing the modal
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState(""); 
    const[modalTitle,setModaltitle] = useState("");

    //Create a set to handle the property for mydialog
    const[Properties,setProperties] = useState(isFavClick);

    const handleOpenModal = (msg) => {
        setOpenModal(true);
        //setIsFavClick(!isFavClick); // Toggle the favorite state

        //use switch case for all the buttons to display specific alerts or dialogs
        switch(msg){
            case "fav":{
                if (!isFavClick) {
                    setProperties(isFavClick);
                    setModaltitle("Info");
                    setModalMessage("Game added to favorites.... :)");
                }else{
                    setProperties(isFavClick);
                    setModaltitle("Alert");
                    setModalMessage("Game removed from favorites!! :(");
                }
                break;
            }
            case "cart":{
                if (!isCartClick) {
                    setProperties(isCartClick);
                    setModaltitle("Info");
                    setModalMessage("Game added to Cart.... :)");
                }else{
                    setProperties(isCartClick);
                    setModaltitle("Alert");
                    setModalMessage("Game removed from Cart!! :(");
                }
                break;
            }
            case "book":{
                if (!isBookClick) {
                    setProperties(isBookClick);
                    setModaltitle("Info");
                    setModalMessage("Bookmark Added... :)");
                }else{
                    setProperties(isBookClick);
                    setModaltitle("Alert");
                    setModalMessage("Bookmark Removed!! :(");
                }
                break;
            }
        }
    };
    
    const handleCloseModal = () => {
        setOpenModal(false);
    };


    //Creating my custom Dialog
    const MyDialog = ({props})=>{
        return(
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle className={ !props ? "fw-bolder fst-italic fs-4 font-monospace text-bg-success" : "fw-bolder fst-italic fs-4 font-monospace text-bg-danger"} maxWidth="xs">{modalTitle}</DialogTitle>
                <DialogContent className={!props ? "mt-3 fw-bolder font-monospace text-success" : "mt-3 fw-bolder font-monospace text-danger" }>{modalMessage}</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>
                        <IconButton color={!props? "success" : "error"}>
                            <Close color={!props? "success" : "error"}/>
                        </IconButton>
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    const favClick = ()=>{
        setIsFavClick(!isFavClick);
        if(!isFavClick){
            handleOpenModal("fav");
        }else{
            handleOpenModal("fav");
        }
    }

    const cartClick = ()=>{
        setIsCartClick(!isCartClick);
        if(!isCartClick){
            handleOpenModal("cart");
        }else{
            handleOpenModal("cart");
        }
    }

    const sendClick = ()=>{
        setIsSendClick(!isSendClick);
    }

    const nextClick=()=>{
        setIdx((idx+1)%len);
    }

    const prevClick = ()=>{
        setIdx((idx-1+len)%len);
    }

    const ppClick = ()=>{
        setIsPpClick(!isPpClick);
        const sts = document.getElementById("status");
        if(!isPpClick){
            sts.innerHTML = `Slideshow has Started...`.fontcolor('black').bold();
            setTimer(setInterval(()=>{
                setIdx((prevIdx)=>(prevIdx+1)%len)
            },2000))
        }else{
            sts.innerHTML = `Slideshow has Stopped...`.fontcolor('black').bold();
            clearInterval(timer);
        }
    }

    const bookClick = ()=>{ 
        setIsBookClick(!isBookClick);
        if(!isBookClick){
            handleOpenModal("book");
        }else{
            handleOpenModal("book");
        }
    }

    useEffect(()=>{
        fetch("https://mern2-node-mongo.onrender.com/getGames")
        .then((res)=>res.json())
        .then((data)=>{
            setGames(data);
            setLen(data.length);
        })
    },[])

    return(
        <div className="container-fluid">
            <header className="text-center p-2 text-bg-white text-danger">
                <h4 style={{border:"2px solid red"}} className="fs-5 fst-italic fw-bolder font-monospace"><span className="bi bi-steam"> All Games Are Displyed Here</span></h4>
            </header>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                {/* Card Component Starting */}
                <Card className="text-bg-warning font-monospace text-dark" elevation={4}>
                    {/* Card Header */}
                    <CardHeader
                        avatar = {
                            <Avatar src={games[idx].image}/>
                        }
                        action = {
                            <IconButton className="text-dark">
                                <MoreHoriz/>
                            </IconButton>
                        }
                        title = {<b className="font-monospace fs-5 fst-italic">{games[idx].title}</b>}
                    />
                    {/* Card Body */}
                    <CardContent className="row card-body font-monospace">
                        <Typography className="font-monospace mb-2">
                            Publisher: {<b>{games[idx].publisher}</b>}<br/>
                            Price: {<b>{games[idx].price}</b>}
                        </Typography>
                        <CardActions className="col-1 d-flex justify-content-center flex-column">
                            <Button onClick={prevClick} variant="text" className="text-dark" size="small"><b><ChevronLeft/></b></Button>
                        </CardActions>
                        <div className="col-10  d-flex flex-column">
                            {/* Image goes here */}
                            <CardMedia
                                component="img"
                                image={games[idx].image}
                                style={{border:"3px solid black"}}
                                height={340} 
                            />
                            <p id="status" className="text-center font-monospace"></p>
                        </div>
                        <CardActions className="col-1 d-flex justify-content-center flex-column">
                            <Button onClick={nextClick} variant="text" className="text-dark" size="small"><b><ChevronRight/></b></Button>
                        </CardActions>
                    </CardContent>
                    {/* Card Footer */}
                    <div className="row" style={{borderTop:"1px solid black"}}>
                        <div className="col-4 d-flex justify-content-center">
                            <IconButton onClick={favClick} className="text-dark">
                                {isFavClick ? <Favorite/> : <FavoriteBorder/>}
                            </IconButton>
                            <IconButton className="text-dark" onClick={cartClick}> 
                                {isCartClick ? <ShoppingCart/> : <AddShoppingCart/> }
                            </IconButton>
                            <IconButton className="text-dark" onClick={sendClick}>
                                {isSendClick ? <SendSharp/> : <SendOutlined/> }
                            </IconButton>
                        </div>
                        <div className="col-5 d-flex justify-content-center"/>
                        <div className="col-3 d-flex justify-content-center">
                            <IconButton onClick={ppClick} className="text-dark">
                                {isPpClick ? <PauseCircleFilled/> : <PlayCircleFilled/>}
                            </IconButton>
                            <IconButton onClick={bookClick} className="text-dark">
                                {isBookClick ? <Bookmark/> : <BookmarkBorderOutlined/>}
                            </IconButton>
                        </div>
                    </div>
                </Card>
            </Container>
            {/* dialog */}
            <MyDialog props={Properties}/>
        </div>
    )
}
export default GetAllGames;