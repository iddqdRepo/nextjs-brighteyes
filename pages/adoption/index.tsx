import React, { useState, useEffect } from "react";
import styles from "./adoption.module.css";
import Link from "next/link";
// import * as api from "../api/apiIndex";
// import DonateSlantedComponent from "../../components/";

function Adoption() {
  // let navigate = useNavigate();
  const [animals, setAnimals] = useState("");
  const [filteredAnimals, setFilteredAnimals] = useState("");

  useEffect(() => {
    // const getAllAnimals = async () => {
    //   const data = await api.fetchPets();
    //   // console.log(data);
    //   setAnimals(
    //     data.data.filter((animal) => {
    //       return animal.adopted === "No";
    //     })
    //   );
    //   setFilteredAnimals((animal) => {
    //     return animal.adopted === "No";
    //   });
    // };
    // getAllAnimals();
  }, []);

  const handleViewBio = (id) => {
    // navigate(`/adoption/viewBio?id=${id}`, {
    //   state: {
    //     detail: { id },
    //   },
    // });
  };

  return (
    <>
      <div className={styles["adoption-container"]}>
        <div className={styles["adoption-header"]}>Adoption Criteria</div>
        <div className={styles["adoption-subtext"]}>
          There are certain criteria that need to be met in order to adopt a pet
          from Bright Eyes, please make sure you meet the criteria before
          submitting your application.
        </div>

        <div className={styles["adoption-split-content"]}>
          <div className={styles["adoption-split-points-left-container"]}>
            <div className={styles["adoption-point-container"]}>
              <span
                className={styles["iconify-inline"]}
                data-icon="bi:check-circle"
              ></span>
              <span className={styles["adoption-point-text"]}>
                {" "}
                Enclosed Garden{" "}
              </span>
            </div>
            <div className={styles["adoption-point-container"]}>
              <span
                className={styles["iconify-inline"]}
                data-icon="bi:check-circle"
              ></span>
              <span className={styles["adoption-point-text"]}>
                {" "}
                Sleeping Indoors{" "}
              </span>
            </div>
            <div className={styles["adoption-point-container"]}>
              <span
                className={styles["iconify-inline"]}
                data-icon="bi:check-circle"
              ></span>
              <span className={styles["adoption-point-text"]}>
                {" "}
                Landlord Permission{" "}
              </span>
            </div>
          </div>

          <div className={styles["adoption-split-points-right-container"]}>
            <div className={styles["adoption-point-container"]}>
              <span
                className={styles["iconify-inline"]}
                data-icon="bi:check-circle"
              ></span>
              <span className={styles["adoption-point-text"]}>
                {" "}
                Children 12+{" "}
              </span>
            </div>
            <div className={styles["adoption-point-container"]}>
              <span
                className={styles["iconify-inline"]}
                data-icon="bi:check-circle"
              ></span>
              <span className={styles["adoption-point-text"]}>
                {" "}
                Compulsory Home Check{" "}
              </span>
            </div>
            <div className={styles["adoption-point-container"]}>
              <span
                className={styles["iconify-inline"]}
                data-icon="bi:check-circle"
              ></span>
              <span className={styles["adoption-point-text"]}>
                {" "}
                Form Required{" "}
              </span>
            </div>
          </div>
        </div>
        <Link href="/forms">
          <button
            type="button"
            className={[styles["adoption-form-button"], styles.button].join(
              " "
            )}
          >
            Adoption Form
          </button>
        </Link>

        <div className={styles["slanted-div-filter"]}>
          <div className={styles["slanted-div-filter-content-container"]}>
            <div className={styles["slanted-div-left-filter-text-container"]}>
              <span className={styles["filter-header"]}>Filter</span> <br />
              <br />
              <div className={styles["filter-dropdown"]}>
                <div className={styles["dropdown"]}>
                  <select
                    name="one"
                    className={styles["dropdown-select"]}
                    onChange={(e) => {
                      setFilteredAnimals(e.target.value);
                    }}
                  >
                    <option value="all">All</option>
                    <option value="Dog">Dogs</option>
                    <option value="Cat">Cats</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["pet-viewer-content-container"]}>
          {!animals ? (
            <>
              <div className={styles["Loading-ring"]}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </>
          ) : (
            animals
              .filter((val) => {
                if (filteredAnimals === "Dog") {
                  return val.type === "Dog";
                } else if (filteredAnimals === "Cat") {
                  return val.type === "Cat";
                } else {
                  return val;
                }
              })
              .map((key) => {
                return (
                  <div
                    data-testid="AnimalContainer"
                    className={styles["pet-container"]}
                    key={key.name + key.age}
                  >
                    <div
                      className={styles["pet-image"]}
                      style={{
                        backgroundImage: `url("${key.image}")`,
                      }}
                    ></div>
                    <div className={styles["pet-age-weight"]}>
                      <div className={styles["pet-weight"]}>
                        <span
                          className={styles["iconify-inline"]}
                          data-icon="ion:scale-sharp"
                        ></span>
                        &nbsp;{key.size}
                      </div>
                      <div className={styles["pet-age"]}>
                        <span
                          className={styles["iconify-inline"]}
                          data-icon="bi:calendar-week-fill"
                        ></span>
                        &nbsp;{key.age} {key.yearsOrMonths}
                      </div>
                    </div>
                    {/* <div className={styles["pet-description"]}>{key.desc}</div> */}
                    <div className={styles["pet-name"]}>{key.name}</div>

                    <button
                      className={styles["button pet-read-more-link"]}
                      onClick={() => handleViewBio(key._id)}
                    >
                      view {key.name}
                    </button>
                  </div>
                );
              })
          )}
        </div>
      </div>

      {/* <DonateSlantedComponent /> */}
    </>
  );
}

export default Adoption;
