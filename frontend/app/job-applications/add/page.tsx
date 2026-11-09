import ApplicationsPage from "../page";
import AddApplicationModal from "../components/AddApplicationModal";

export default function AddApplicationPreview() {
  return <><div aria-hidden="true" inert><ApplicationsPage /></div><AddApplicationModal /></>;
}
