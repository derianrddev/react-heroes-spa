import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers";

export const HeroPage = () => {

  const { heroId } = useParams();
  const navigate = useNavigate();

  const hero = useMemo( () => getHeroById( heroId ), [ heroId ]);

  const onNavigateBack = () => {
    navigate(-1);
  }

  if (!hero) {
    return <Navigate to="/marvel" />;
  }

  const { id, superhero, publisher, alter_ego, first_appearance, characters } = hero;
  const heroImageUrl = `/assets/heroes/${ id }.jpg`;

  return (
    <>
      <div className="row my-5">
        <div className="col-4">
          <img
           className="img-thumbnail animate__animated animate__fadeInLeft" 
           src={ heroImageUrl } 
           alt={ superhero } 
          />
        </div>
        <div className="col-8">
          <h3>{ superhero }</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><b>Alter ego:</b> { alter_ego }</li>
            <li className="list-group-item"><b>Publisher:</b> { publisher }</li>
            <li className="list-group-item"><b>First appearance:</b> { first_appearance }</li>
          </ul>
          <h5 className="mt-3"> Characters </h5>
          <p>{ characters }</p>
          <button
           className="btn btn-outline-primary" 
           onClick={ onNavigateBack }
          >
            Exit
          </button>
        </div>
      </div>
    </>
  )
}
