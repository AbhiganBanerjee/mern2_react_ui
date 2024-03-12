import { AutoStories, FourK, Home, Keyboard, ShoppingBag, SportsEsports} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const StoreHome = ()=>{
    return(
        <div className="container-fluid">
            <header className="text-danger text-center text-bg-white m-2 p-2">
                <h2 className="fw-bolder fst-italic font-monospace" style={{border:"4px solid red"}}><IconButton size="large" color="error"><Home/></IconButton>&nbsp;Welcome to Store Home Page</h2>
            </header>
            <section className="row mt-2 mb-2">
                <nav className="col-3 mt-2 mb-2" style={{marginLeft:"14px"}}>
                    <div className="mt-2 mb-3">
                        <Link to="insertGames">
                            <Button className="w-100 fw-bolder font-monspace" variant="contained" color="error">
                                <b><SportsEsports/> Insert New Games</b>
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-2 mb-3">
                        <Link to="insertAnimes">
                            <Button className="w-100 fw-bolder font-monspace" variant="contained" color="error">
                                <b><FourK/> Insert New Animes</b>
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-2 mb-3">
                        <Link to="insertBooks">
                            <Button className="w-100 fw-bolder font-monspace" variant="contained" color="error">
                                <b><AutoStories/> Insert New Books</b>
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-2 mb-3">
                        <Link to="insertProducts">
                            <Button className="w-100 fw-bolder font-monspace" variant="contained" color="error">
                                <b><ShoppingBag/> Insert New Products</b>
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-2 mb-3">
                        <Link to="insertAccess">
                            <Button className="w-100 fw-bolder font-monspace" variant="contained" color="error">
                                <b><Keyboard/> Insert New Accessories</b>
                            </Button>
                        </Link>
                    </div>
                </nav>
                <main className="col-8 mt-2 mb-2 d-flex justify-content-center align-items-center" style={{height:"530px"}}>
                    <Outlet/>
                </main>
            </section>
        </div>
    )
}

export default StoreHome;