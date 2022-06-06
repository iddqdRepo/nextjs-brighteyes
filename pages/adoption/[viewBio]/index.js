import dbConnect from "../../../utils/dbConnect";
import PetModel from "../../../models/petModel";
// import DonateSlantedComponent from "./DonateSlantedComponent";
import { useEffect, useState } from "react";
import styles from "./viewBio.module.css";

function ViewBio({ animal }) {
  const [animalBio, setAnimalBio] = useState(animal);

  useEffect(() => {
    setAnimalBio(animal);
  }, [animal]);

  const handleRedirectToForm = () => {};

  return (
    <>
      {!animalBio ? (
        <div className={styles["loading-container"]}>
          <div className={styles["Loading-ring"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles["bio-page-container"]}>
            <div className={styles["bio-name"]}>{animalBio.name}</div>
            <div className={styles["bio-container"]}>
              <div className={styles["about-header"]}></div>

              <div className={styles["bio-split-content"]}>
                <div
                  className={styles["bio-split-image"]}
                  style={{
                    backgroundImage: `url(${animalBio.image})`,
                  }}
                ></div>
                <div className={styles["bio-split-text"]}>
                  <div className={styles["bio-split-text-title"]}>
                    Bio for {animalBio.name}
                  </div>

                  <div className={styles["bio-split-text-description"]}>
                    <div className={styles["bio-split-list-title"]}></div>
                    <ul className={styles["bio-ul"]}>
                      <li className={styles["bio-list-item"]}>
                        Age
                        <span className={styles["bio-right-text"]}>
                          {animalBio.age} &nbsp;
                          {animalBio.yearsOrMonths}
                        </span>
                      </li>
                      <div className={styles["dotted-line"]}></div>
                      <li className={styles["bio-list-item"]}>
                        <span className={styles["bio-left-text"]}>Breed</span>
                        <span className={styles["bio-right-text"]}>
                          {animalBio.breed}
                        </span>
                      </li>
                      <div className={styles["dotted-line"]}></div>
                      <li className={styles["bio-list-item"]}>
                        Size
                        <span className={styles["bio-right-text"]}>
                          {animalBio.size}
                        </span>
                      </li>
                      <div className={styles["dotted-line"]}></div>
                      <li className={styles["bio-list-item"]}>
                        Suitable for Animals
                        <span className={styles["bio-right-text"]}>
                          {animalBio.suitableForAnimals}
                        </span>
                      </li>
                      <div className={styles["dotted-line"]}></div>
                      <li className={styles["bio-list-item"]}>
                        Suitable for Children
                        <span className={styles["bio-right-text"]}>
                          {animalBio.suitableForChildren}
                        </span>
                      </li>
                      <div className={styles["dotted-line"]}></div>
                      <li className={styles["bio-list-item"]}>
                        Adopted
                        <span className={styles["bio-right-text"]}>
                          {animalBio.adopted}
                        </span>
                      </li>
                      {/* <div className={styles["dotted-line"]}></div> */}
                    </ul>
                  </div>

                  <button
                    className={[
                      styles["bio-adoption-form-button"],
                      styles.button,
                    ].join(" ")}
                    onClick={() => handleRedirectToForm()}
                  >
                    Adoption Form
                  </button>
                </div>
              </div>

              <div className={styles["bio-description-container"]}>
                <div className={styles["bio-description-content"]}>
                  <pre>{animalBio.desc}</pre>
                </div>
              </div>
            </div>
          </div>
          {/* <DonateSlantedComponent /> */}
        </>
      )}
    </>
  );
}

export default ViewBio;

export const getServerSideProps = async (context) => {
  await dbConnect();
  console.log(context.query.id);

  const result = await PetModel.find({ _id: context.query.id });
  let animal = result[0].toObject();
  console.log("result is: ", result);
  if (animal._id) {
    animal._id = animal._id.toString();
  }
  if (animal.createdAt) {
    animal.createdAt = animal.createdAt.toString();
  }
  if (animal.updatedAt) {
    animal.updatedAt = animal.updatedAt.toString();
  }

  return { props: { animal } };
};
