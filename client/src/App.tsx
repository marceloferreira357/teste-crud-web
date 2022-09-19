import React from "react";
import ContainerBootstrap from 'react-bootstrap/Container';
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Companies from "./pages/Companies";
import Customers from "./pages/Customers";
import Error from "./pages/Error";
import Home from "./pages/Home";
import { PagesContainer } from "./styles";

const App: React.FC = (): JSX.Element => {
	return (
		<ContainerBootstrap fluid="lg">
			<PagesContainer>
				<Navbar />
				<div style={{ flex: 1 }}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/customers" element={<Customers />} />
						<Route path="/companies" element={<Companies />} />
						<Route path="*" element={<Error />} />
					</Routes>
				</div>
				<Footer />
			</PagesContainer>
		</ContainerBootstrap>
	);
}

export default App;