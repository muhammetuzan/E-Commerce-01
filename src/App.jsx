import { BrowserRouter as Router } from "react-router-dom";
import Header from "./layout/Header";
import HomePage from "./pages/HomePage";

export default function App() {
	return (
		<Router>
			<div className="min-h-screen max-w-[414px] mx-auto">
				<Header />
				<HomePage />
			</div>
		</Router>
	);
}
