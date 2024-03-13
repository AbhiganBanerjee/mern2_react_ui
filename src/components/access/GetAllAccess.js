import { AddShoppingCartOutlined, Bookmark, BookmarkBorder, ChevronLeft, ChevronRight, Close, Favorite, FavoriteBorder, MoreHoriz, PauseCircle, PlayCircle, Send, SendOutlined, ShoppingCart } from "@mui/icons-material";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const GetAllAccess = ()=>{   

    //Get all the access coming from the API
    const[access,setAccess] = useState([{}]);
    const[idx,setIdx] = useState(0);
    const[len,setLen] = useState(0);
    const[timer,setTimer] = useState(0);

    useEffect(()=>{
        fetch("https://mern2-node-mongo.onrender.com/getAccess")
        .then((res)=>res.json())
        .then((data)=>{
            setAccess(data);
            setLen(data.length);
        })
    },[]);


    //Manage states for tooggling the buttons
    const[isFavClick,setIsFavClick] = useState(false);
    const[isSendClick,setIsSendClick] = useState(false);
    const[isCartClick,setIsCartClick] = useState(false);
    const[isBookClick,setIsBookClick] = useState(false);
    const[isPpClick,setIsPpClick] = useState(false);

    //manage methods and states for handling the alert
    const[openAlert,setOpenAlert] = useState(false);
    const[alertTitle,setAlertTitle] = useState("");
    const[alertContent,setAlertContent] = useState("");
    const[props,setProps] = useState(isFavClick);

    const handleAlertOpen = (msg)=>{
        setOpenAlert(true);
        switch(msg){
            case "fav":{
                if(!isFavClick){
                    setProps(isFavClick);
                    setAlertTitle("Info");
                    setAlertContent("Accessory Added to Favourites... :)");
                }else{
                    setProps(isFavClick);
                    setAlertTitle("Alert");
                    setAlertContent("Accessory Removed from Favourites!! :(");
                }
                break;
            }
            case "cart":{
                if(!isCartClick){
                    setProps(isCartClick);
                    setAlertTitle("Info");
                    setAlertContent("Accessory Added to Cart... :)");
                }else{
                    setProps(isCartClick);
                    setAlertTitle("Alert");
                    setAlertContent("Accessoryt Removed from Cart!! :(");
                }
                break;
            }
            case "book":{
                if(!isBookClick){
                    setProps(isBookClick);
                    setAlertTitle("Info");
                    setAlertContent("Bookmark Added... :)");
                }else{
                    setProps(isBookClick);
                    setAlertTitle("Alert");
                    setAlertContent("Bookmark Removed!! :(");
                }
                break;
            }
        }
    }
    const handleAlertClose = ()=>{
        setOpenAlert(false);
    }

    //create a custom dialog or alert with props
    const MyDialog = ({props})=>{
        return(
            <Dialog open={openAlert} onClose={handleAlertClose}>
                <DialogTitle className={!props ? "fw-bolder fs-5 fst-italic font-monospace text-bg-success" : "fw-bolder fs-5 fst-italic font-monospace text-bg-danger"}>{alertTitle}</DialogTitle>
                <DialogContent className={!props ? "fw-bolder mt-3 font-monospace text-success" : "fw-bolder mt-3 font-monospace text-danger"}>{alertContent}</DialogContent>
                <DialogActions>
                    <IconButton color={!props ? "success" : "error"} onClick={handleAlertClose} ><Close/></IconButton>
                </DialogActions>
            </Dialog>
        )
    }

    const nextClick = ()=>{
        setIdx((idx+1)%len);
    }
    const prevClick = ()=>{
        setIdx((idx-1+len)%len);
    }
    const ppClick = ()=>{
        setIsPpClick(!isPpClick);
        const sts = document.getElementById("status");
        if(!isPpClick){
            sts.innerHTML = `Slideshow has Started...`.bold();
            setTimer(setInterval(()=>{
                setIdx((prevIdx)=>(prevIdx+1)%len);
            },2000))
        }else{
            sts.innerHTML = `Slideshow has Stopped!!`.bold();
            clearInterval(timer);
        }
    }

    const favClick = ()=>{
        setIsFavClick(!isFavClick);
        if(!isFavClick){
            handleAlertOpen("fav");
        }else{
            handleAlertOpen("fav");
        }
    }

    const cartClick = ()=>{
        setIsCartClick(!isCartClick);
        if(!isCartClick){
            handleAlertOpen("cart");
        }else{
            handleAlertOpen("cart");
        }
    }

    const sendClick = ()=>{
        setIsSendClick(!isSendClick);
    }

    const bookClick = ()=>{
        setIsBookClick(!isBookClick);
        if(!isBookClick){
            handleAlertOpen("book");
        }else{
            handleAlertOpen("book");
        }
    }

    return(
        <div className="container-fluid">
            <header className="text-center p-2 text-bg-white text-danger">
                <h4 style={{border:"2px solid red"}} className="fs-5 fst-italic fw-bolder font-monospace"><span className="bi bi-bag-heart-fill"> All Accessories Are Displyed Here</span></h4>
            </header>
            <Container component="main" maxWidth="xs">
                {/* Start the Card */}
                <Card className="font-monoscope text-bg-white text-danger" elevation={4}>
                    {/* Card Header */}
                    <CardHeader
                        avatar = {
                            <Avatar src={access[idx].image}/>
                        }
                        action = {
                            <IconButton className="text-danger">
                                <MoreHoriz/>
                            </IconButton>
                        }
                        title = {<b className="fs-5 font-monospace fw-bolder fst-italic">{access[idx].title}</b>}
                    />
                    {/* Card Body */}
                    <CardContent className="row card-body font-monospace">
                        <Typography className="mb-2 font-monospace text-danger">
                            ID: <b className="fw-bolder text-danger">{access[idx].id}</b><br/>
                            Price: <b className="fw-bolder text-danger">{access[idx].price}</b>
                        </Typography>
                        <CardActions className="col-1 d-flex justify-content-center">
                            <Button onClick={prevClick} variant="text" size="small" className="text-danger"><b><ChevronLeft/></b></Button>
                        </CardActions>
                        <div className="col-10 d-flex flex-column">
                            {/* Image goes here */}
                            <CardMedia
                                component="img"
                                image={access[idx].image}
                                style={{border:"3px solid red"}}
                                height={340}
                            />
                            <p id="status" className="text-center text-danger font-monospace fw-bolder"></p>
                        </div>
                        <CardActions className="col-1 d-flex justify-content-center">
                            <Button onClick={nextClick} variant="text" size="small" className="text-danger"><b><ChevronRight/></b></Button>
                        </CardActions>
                    </CardContent>
                    {/* Card Footer */}
                    <div className="row" style={{borderTop:"1px solid red"}}> 
                        <div className="col-4 d-flex justify-content-center">
                            <IconButton onClick={favClick} className="text-danger">
                                { isFavClick ? <Favorite/> : <FavoriteBorder/>}
                            </IconButton>
                            <IconButton onClick={cartClick} className="text-danger">
                                { isCartClick ? <ShoppingCart/> : <AddShoppingCartOutlined/>}
                            </IconButton>
                            <IconButton onClick={sendClick} className="text-danger">
                                { isSendClick ? <Send/> : <SendOutlined/>}
                            </IconButton>
                        </div>

                        <div className="col-5 d-flex justify-content-center"/>

                        <div className="col-3 d-flex justify-content-center">
                            <IconButton onClick={ppClick} className="text-danger">
                                { isPpClick ? <PauseCircle/> : <PlayCircle/>}
                            </IconButton>
                            <IconButton onClick={bookClick} className="text-danger">
                                { isBookClick ? <Bookmark/> : <BookmarkBorder/>}
                            </IconButton>
                        </div>
                    </div>
                </Card>
            </Container>

            {/* Add Custom Dialog */}
            <MyDialog props={props} />
        </div>
    )
}
export default GetAllAccess;