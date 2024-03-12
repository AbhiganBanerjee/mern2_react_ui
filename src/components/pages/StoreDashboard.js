import { Dashboard} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const StoreDashboard = ()=>{
    return(
        <div className="container-fluid">
            <header className="text-center text-bg-white text-danger p-2 m-2">      
                <h2 style={{border:"4px solid red"}} className="fw-bolder fst-italic font-monospace"><IconButton size="large" color="error"><Dashboard/></IconButton>&nbsp;Welcome to Store Dashboard</h2>
            </header>
            <section className="row mt-2 mb-2">
                <nav className="col-3 mt-2 mb-2" style={{marginLeft:"10px"}}>
                    <div className="mt-2 mb-3">
                        <Link to="getGames"><Button size="small" className="w-100 text-center fw-bolder font-monospace"><span className="w-100 bi bi-steam btn btn-outline-danger"> Available Games</span></Button></Link>
                    </div>
                    <div className="mt-2 mb-3">
                        <Link to="getAnimes"><Button size="small" className="w-100 text-center  fw-bolder font-monospace" ><span className="w-100 bi bi-badge-4k-fill btn btn-outline-danger"> Available Animes</span></Button></Link>
                    </div>
                    <div className="mt-2 mb-3">
                        <Link to="getBooks"><Button size="small" className="w-100 text-center fw-bolder font-monospace"> <span className="w-100 bi bi-book-half btn btn-outline-danger"> Available Books</span></Button></Link>
                    </div>
                    <div className="mt-2 mb-3">
                        <Link to="getProducts"><Button size="small" className="w-100 text-center  fw-bolder font-monospace"><span className="w-100 bi bi-bag-heart-fill btn btn-outline-danger"> Available Products</span></Button></Link>
                    </div>
                    <div className="mt-2 mb-3">
                        <Link to="getAccess"><Button size="small" className="w-100 text-center  fw-bolder font-monospace"><span className="w-100 bi bi-mouse3-fill btn btn-outline-danger"> Available Accessories</span></Button></Link>
                    </div>
                </nav>
                <main className="col-8 mt-2 mb-2 d-flex justify-content-center align-items-center" style={{height:"590px"}}>
                    <Outlet/>
                </main>
            </section>
        </div>
    )   
}

export default StoreDashboard;