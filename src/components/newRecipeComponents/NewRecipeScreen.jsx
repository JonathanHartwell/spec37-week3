import React, { useState } from "react";
import { Formik } from "formik";
import styles from "./form.module.css";
import axios from "axios";

const NewRecipeScreen = () => {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const url = "https://recipes.devmountain.com";

  const addIngredient = () => {
    setIngredients([...ingredients, { name, quantity }]);
    setName("");
    setQuantity("");
  };

  const initialValues = {
    type: "",
    recipeName: "",
    imageURL: "",
    prepTime: "",
    cookTime: "",
    serves: "",
    ingredients: [],
    instructions: "",
  };

  const onSubmit = (values) => {
    values.ingredients = ingredients;
    console.log(values);
    axios
    .post(`https://recipes.devmountain.com/recipes`, values)
    .then((res) => {
      console.log(res.data);
    })
    .catch((theseHands) => {
      console.log(theseHands)
    });
  };

  const ingredientDisplay = ingredients.map((ing) => {
    return (
      <li>
        {ing.quantity} {ing.name}
      </li>
    );
  });

  return (
    <section>
      <h1>Tell us about your Recipe!</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <form className={styles.newrecipeform} onSubmit={handleSubmit}>
            <div className={styles.inputcontainer}>
              <input
                placeholder="Name of recipe"
                value={values.recipeName}
                onChange={handleChange}
                name="recipeName"
              />
              <input
                placeholder="Image URL"
                value={values.imageURL}
                onChange={handleChange}
                name="imageURL"
              />
            </div>
            <div className={styles.cookbakedrink}>
              <span>
                <input
                  className={styles.radiobtn}
                  type="radio"
                  value="Cook"
                  onChange={handleChange}
                  name="type"
                />
                <h4>Cook</h4>
              </span>
              <span>
                <input
                  className={styles.radiobtn}
                  type="radio"
                  value="Bake"
                  onChange={handleChange}
                  name="type"
                />
                <h4>Bake</h4>
              </span>
              <span>
                <input
                  className={styles.radiobtn}
                  type="radio"
                  value="Drink"
                  onChange={handleChange}
                  name="type"
                />
                <h4>Drink</h4>
              </span>
            </div>
            <div className={styles.inputcontainer}>
              <input
                placeholder="Prep time"
                value={values.prepTime}
                onChange={handleChange}
                name="prepTime"
              />
              <input
                placeholder="Cook time"
                value={values.cookTime}
                onChange={handleChange}
                name="cookTime"
              />
              <input
                placeholder="Serves"
                value={values.serves}
                onChange={handleChange}
                name="serves"
              />
            </div>

            <h3>Ingredients</h3>
            <section className={styles.ingredientsect}>
              <div className={styles.ingredientinputs}>
                <input
                  placeholder="Ingredient"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <ul>{ingredientDisplay}</ul>
            </section>
            <button type="button" className="bluebtn" onClick={addIngredient}>
              Add another
            </button>
            <textarea
              placeholder="Type your instructions"
              rows={6}
              value={values.instructions}
              onChange={handleChange}
              name="instructions"
            />
            <button type="submit" className="bluebtn">
              Submit
            </button>
          </form>
        )}
      </Formik>
    </section>
  );
};

export default NewRecipeScreen;
