import { Routes, Route } from "react-router-dom";
import WalletSelect from "./pages/WalletSelect";
import MentorWallet from "./pages/MentorWallet";
import UserWallet from "./pages/UserWallet";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WalletSelect />} />
      <Route path="/mentor-wallet" element={<MentorWallet />} />
      <Route path="/user-wallet" element={<UserWallet />} />
    </Routes>
  );
}
