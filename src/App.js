import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./Redux/appStore";
import Restaurant from "./utils/RestaurantContext";
import { Toaster } from "react-hot-toast";
import { Footer } from "./components/Footer";
function App() {
  return (
    // Redux wrap
    <Provider store={appStore}>
      {/* Context API  wrap*/}
      <Restaurant>
        <div>
          <Header />
          <Outlet />
          <Footer />
          <Toaster position="top-center" />
        </div>
      </Restaurant>
    </Provider>
  );
}

export default App;
