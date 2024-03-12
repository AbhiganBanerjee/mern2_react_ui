import { Dashboard, Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import StoreHome from "./StoreHome";
import StoreDashboard from "./StoreDashboard";
import GetAllAccess from "../access/GetAllAccess";
import GetAllGames from "../games/GetAllGames";
import GetAllAnimes from "../animes/GetAllAnimes";
import GetAllBooks from "../books/GetAllBooks";
import GetAllProducts from "../products/GetAllProducts";
import InsertNewGames from "../games/InsertNewGames";
import InsertNewAnime from "../animes/InsertNewAnime";
import InsertNewBooks from "../books/InsertNewBooks";
import InsertNewProducts from "../products/InsertNewProducts";
import InsertNewAccess from "../access/InsertNewAccess";

const StoreIndex = ()=>{
    return(
        <div className="container-fluid">
            <header className="text-white text-bg-danger m-2 p-2 text-center">
                <h1 className="fw-bolder fst-italic font-monospace">Welcome to Store Index Page</h1>
            </header>
            <BrowserRouter>
                <section className="row mt-2 mb-2">
                    <nav className="mt-2 mb-2 col-2">
                        <div className="mt-2 mb-3" style={{marginLeft:"8px"}}>
                            <Link to="/home"><Button className="text-center fw-bolder fs-5 font-monospace w-100" variant="outlined" size="large" color="error"><Home/>&nbsp;Home</Button></Link>
                        </div>
                        <div className="mt-2 mb-3" style={{marginLeft:"8px"}}>
                            <Link to="/dashboard"><Button className="text-center fw-bolder fs-5 font-monospace w-100" variant="outlined" size="large" color="error"><Dashboard/>&nbsp;Dashboard</Button></Link>
                        </div>
                    </nav>
                    <main className="col-10 mt-2 mb-2">
                        <Routes>
                            <Route path="home" element={<StoreHome/>}>
                                <Route path="insertGames" element={<InsertNewGames/>}></Route>
                                <Route path="insertAnimes" element={<InsertNewAnime/>}></Route>
                                <Route path="insertBooks" element={<InsertNewBooks/>}></Route>
                                <Route path="insertProducts" element={<InsertNewProducts/>}></Route>
                                <Route path="insertAccess" element={<InsertNewAccess/>}></Route>
                            </Route>
                            <Route path="dashboard" element={<StoreDashboard/>}>
                                <Route path="getGames" element={<GetAllGames/>}></Route>
                                <Route path="getAccess" element={<GetAllAccess/>}></Route>
                                <Route path="getAnimes" element={<GetAllAnimes/>}></Route>
                                <Route path="getBooks" element={<GetAllBooks/>}></Route>
                                <Route path="getProducts" element={<GetAllProducts/>}></Route>
                            </Route>
                        </Routes>
                    </main>
                </section>
            </BrowserRouter>
        </div>
    )
}

export default StoreIndex;