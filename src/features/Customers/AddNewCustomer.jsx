import AddNewButton from "../../components/AddNewButton";
import MoveBackBtn from "../../components/MoveBackBtn";
import SearchsInputs from "../../components/SearchsInputs";

const AddNewCustomer = () => {
  return (
    <div>
      <div>
        <MoveBackBtn />
        <div>
          <div className="addNew">New Customer</div>
        </div>
      </div>
    </div>
  );
};

export default AddNewCustomer;
