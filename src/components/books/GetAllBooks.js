import { ChevronLeft, ChevronRight, Close, MoreHoriz} from "@mui/icons-material";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Bookmark, BookmarkOutline, Cart, CartOutline, Heart, HeartOutline, PauseCircle,  PlayCircle,  Send, SendOutline} from "react-ionicons";

const GetAllBooks = ()=>{   

    //get all the books array of json from the backend api
    const[books,setBooks] = useState([{}]);
    const[idx,setIdx] = useState(0);
    const[len,setLen] = useState(0);
    const[timer,setTimer] = useState(0);
    


    //This are the state for toogling buttons on clicks
    const[isLike, setIsLike] = useState(false);
    const[isCartClick,setIsCartClick] = useState(false);
    const[isSendClick,setIsSendClick] = useState(false);
    const[isPpClick,setIsPpClick] = useState(false);
    const[isBookClick,setIsBookClick] = useState(false);

    //set a property for the MyDialog
    const[Properties,setProperties] = useState(isLike);

    //Manage states for dialog
    const[openModel,setOpenModal] = useState(false);
    const[modalTitle,setModaltitle] = useState("");
    const[modalMessage,setModalMessage] = useState("");

    const handleModalClose = ()=>{
      setOpenModal(false);
    }

    const handleOpenModal = (msg)=>{
      setOpenModal(true);
      switch(msg){
        case "like":
          {
            if(!isLike){
              setProperties(isLike);
              setModaltitle("Info");
              setModalMessage("Book Added to Favourites... :)");
            }else{
              setProperties(isLike);
              setModaltitle("Alert");
              setModalMessage("Book Removed from Favourites!! :(");
            }
            break;
          }
        case "cart":
          {
            if(!isCartClick){
              setProperties(isCartClick);
              setModaltitle("Info");
              setModalMessage("Book Added to Cart... :)");
            }else{
              setProperties(isCartClick);
              setModaltitle("Alert");
              setModalMessage("Book Removed from Cart!! :(");
            }
            break;
          }
        case "book":
          {
            if(!isBookClick){
              setProperties(isBookClick);
              setModaltitle("Info");
              setModalMessage("Bookmark Added :)");
            }else{
              setProperties(isBookClick);
              setModaltitle("Alert");
              setModalMessage("Bookmark Removed!! :(");
            }
            break;
          }
      }
    }

    //My Custom Dialog
    const MyCustomDialog = ({props})=>{
      return(
        <Dialog open={openModel} onClose={handleModalClose}>
            <DialogTitle className={!props ? "text-bg-success font-monospace fs-5 fst-italic fw-bolder" : "text-bg-danger font-monospace fs-5 fst-italic fw-bolder"}>{modalTitle}</DialogTitle>
            <DialogContent className={!props ? "mt-3 fw-bolder text-success font-monospace fw-bolder" : "mt-3 fw-bolder text-danger font-monospace fw-bolder" }>{modalMessage}</DialogContent>
            <DialogActions>
                <Button onClick={handleModalClose}>
                  <IconButton color={!props ? "success" : "error"}>
                    <Close color={!props ? "success": "error"}/>
                  </IconButton>
                </Button>
            </DialogActions>
        </Dialog>
      );
    }

    const nextClick = ()=>{
        setIdx((idx+1)%len);
    }

    const prevClick = ()=>{
        setIdx((idx-1+len)%len);
    }

    const playPauseClick = ()=>{
        setIsPpClick(!isPpClick);
        const sts = document.getElementById("status");
        if(!isPpClick){
            sts.innerHTML = `Slideshow has Started....`.fontcolor(`white`).bold();
            setTimer(setInterval(()=>{
                setIdx((prevIdx)=>(prevIdx+1)%len)
            },2000))
        }else{
            sts.innerHTML = `Slideshow has Stopped!!`.fontcolor(`white`).bold();
            clearInterval(timer);
        }
    }

    const likeClick = ()=>{
        // setIsFavorite((prevIsFavorite) => !prevIsFavorite);
        setIsLike(!isLike);
        if(!isLike){
            handleOpenModal("like");
        }else{
            handleOpenModal("like");
        }
    }

    const sendClick = ()=>{
        //setIsSendClick(!isSendClick);
        setIsSendClick((prevIsSend)=>!prevIsSend);
    }

    const bookClick = ()=>{
        setIsBookClick(!isBookClick);
        if(!isBookClick){
            handleOpenModal("book");
        }else{
            handleOpenModal("book");
        }
    }

    const cartClick = ()=>{
        setIsCartClick(!isCartClick);
        if(!isCartClick){
            handleOpenModal("cart")
        }else{
            handleOpenModal("cart");
        }
    }

    useEffect(()=>{
        /*axios.get("https://mern2-node-mongo.onrender.com/getBooks")
        .then((res)=>{
            setBooks(res.data);
            setLen(res.data.length);
        }).catch((err)=>{            //axios is not working with this API
            console.log(err);
        });*/
        fetch("https://mern2-node-mongo.onrender.com/getBooks")
        .then((res)=>res.json())
        .then((data)=>{
            setBooks(data);
            setLen(data.length);
        });
    },[]);

    return (
        <div className="container-fluid">
          <header className="text-center p-2 text-bg-white text-danger">
            <h4 style={{ border: "2px solid red" }} className="fs-5 fst-italic fw-bolder font-monospace">
              <span className="bi bi-book-half"> All Books Are Displayed Here</span>
            </h4>
          </header>
          <Container component="main" maxWidth="xs">
            <CssBaseline/>
            {/* Card Component */}
            <Card className="text-bg-danger text-white" elevation={4}>
              {/* Card Header */}
              <CardHeader
                avatar={<Avatar src={books[idx].image} />}
                action={
                  <IconButton className="text-white">
                    <MoreHoriz />
                  </IconButton>
                }
                title={<b className="fs-5 fst-italic font-monospace">{books[idx].title}</b>}
              />
    
              {/* Card Content or Body */}
              <CardContent className="card-body font-monspace fw-bolder">
                <Typography>
                  <p className="font-monospace">
                    Price: <b>{books[idx].price}</b>
                    <br />
                    Author: <b>{books[idx].author}</b>
                  </p>
                </Typography>
                <div className="font-monospace row">
                  <CardActions className="col-1 d-flex flex-column justify-content-center">
                    <Button onClick={prevClick} variant="text" className="text-white" size="small">
                      <b>
                        <ChevronLeft />
                      </b>
                    </Button>
                  </CardActions>
                  <div className="col-10 d-flex flex-column">
                    <CardMedia component="img" image={books[idx].image} style={{ border: "3px solid white" }} height={340} />
                    <p id="status" className="text-center"></p>
                  </div>
                  <CardActions className="col-1 d-flex flex-column justify-content-center">
                    <Button onClick={nextClick} variant="text" className="text-white" size="small">
                      <b>
                        <ChevronRight />
                      </b>
                    </Button>
                  </CardActions>
                </div>
              </CardContent>
              {/* Card Footer */}
              <div className="row" style={{ borderTop: "1px solid white" }}>
                <div className="col-4 d-flex justify-content-center">
                  <IconButton className="text-white" onClick={likeClick}>
                    {/* {isFavorite ? <FavoriteIcon /> : <FavoriteBorder />} */}
                    {isLike ? <Heart color="white"/> : <HeartOutline color="white"/>}
                  </IconButton>
                  <IconButton className="text-white" onClick={cartClick}>
                    {isCartClick?<Cart color="white"/> : <CartOutline color="white"/> }
                  </IconButton>
                  <IconButton className="text-white" onClick={sendClick}>
                    {isSendClick? <Send color="white"/> : <SendOutline color="white"/>  }
                  </IconButton>
                </div>
                <div className="col-5 d-flex justify-content-center" />
                <div className="col-3 d-flex justify-content-center">
                  <IconButton className="text-white" onClick={playPauseClick}>
                    {isPpClick ? <PauseCircle color="white"/> : <PlayCircle color="white"/>}
                  </IconButton>
                  <IconButton className="text-white" onClick={bookClick}>
                    {isBookClick ? <Bookmark color="white"/> : <BookmarkOutline color="white" />}
                  </IconButton>
                </div>
              </div>
            </Card>
          </Container>
          {/* Just a Dialog */}
          <div>
              {<MyCustomDialog props={Properties}/>}
          </div>
        </div>
    );
}
export default GetAllBooks;