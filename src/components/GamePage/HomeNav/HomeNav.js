/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";

function HomeNav() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/")}
      inverted
      size="tiny"
      className="w-full !mb-8 !mt-6 !text-base"
      type="button"
    >
      Retourner à l'acceuil
    </Button>
  );
}

export default HomeNav;
