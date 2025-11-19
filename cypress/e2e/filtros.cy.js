const accederProducto = ".product-card-horizontal .product-info ";

describe("Búsqueda y Filtrado de Productos", () => {
  beforeEach(() => {
    // Visitar la página de productos antes de cada test
    cy.visit("http://localhost:3000/productos");

    // Esperar a que el navbar cargue completamente
    cy.get(".navbar", { timeout: 10000 }).should("be.visible");

    // Esperar a que carguen los productos o aparezca el mensaje de sin productos
    cy.get(".productos, .no-products", { timeout: 10000 }).should("exist");

    cy.wait(500); // Esperar adicional para estabilidad
  });

  describe("Barra de Búsqueda", () => {
    const textoBuscado = "producto";

    beforeEach(() => {
      // Abrir la barra de búsqueda antes de cada test
      cy.get(".search-toggle-button").click();
      cy.wait(300);
    });

    it("debe mostrar productos visibles inicialmente", () => {
      cy.get(`${accederProducto} .product-title`).should(
        "have.length.at.least",
        1,
      ); // al menos 1 producto
    });

    it("debe filtrar productos al buscar por nombre", () => {
      cy.get(".search-input input").clear().type(textoBuscado);
      cy.wait(500);

      cy.get(`${accederProducto} .product-title`).should(
        "have.length.at.least",
        1,
      ); // que existan resultados

      cy.get(`${accederProducto} .product-header .product-title`).each(
        ($el) => {
          cy.wrap($el)
            .invoke("text")
            .should("match", new RegExp(textoBuscado, "i"));
        },
      );
    });
  });

  describe("Filtros de Categorías", () => {
    it("debe permitir seleccionar múltiples categorías", () => {
      cy.get('.check-input input[type="checkbox"]').eq(0).check();
      cy.get('.check-input input[type="checkbox"]').eq(1).check();

      cy.get('.check-input input[type="checkbox"]:checked').should(
        "have.length",
        2,
      );
    });

    it("debe desmarcar una categoría al hacer clic nuevamente", () => {
      cy.get('.check-input input[type="checkbox"]').first().check();
      cy.get('.check-input input[type="checkbox"]')
        .first()
        .should("be.checked");
      cy.get('.check-input input[type="checkbox"]').first().uncheck();
      cy.get('.check-input input[type="checkbox"]')
        .first()
        .should("not.be.checked");
    });

    it("debe filtrar productos según la categoría seleccionada", () => {
      cy.get(".check-input")
        .first()
        .then(($label) => {
          // Tomar el texto del label (ej: "Tecnología")

          const categoria = $label.text().trim();

          // Tildar el checkbox dentro del label

          cy.wrap($label).find('input[type="checkbox"]').check();

          cy.wait(300);

          // Verificar que los productos tengan esa categoría

          cy.get(`${accederProducto} .categorias-card .categoria `).each(
            ($el) => {
              cy.wrap($el)

                .invoke("text")

                .should("include", categoria); // o regex, como quieras
            },
          );
        });
    });
  });

  describe("Filtro por Precio", () => {
    it("debe mostrar inputs de precio mínimo y máximo", () => {
      cy.contains("h3", "Precio").should("be.visible");
      cy.get('input[name="precioMin"]').should("be.visible");
      cy.get('input[name="precioMax"]').should("be.visible");
    });

    it("debe permitir ingresar precio mínimo", () => {
      cy.get('input[name="precioMin"]')
        .clear()
        .type("100")
        .should("have.value", "100");
    });

    it("debe permitir ingresar precio máximo", () => {
      cy.get('input[name="precioMax"]')
        .clear()
        .type("500")
        .should("have.value", "500");
    });

    it("debe aplicar filtro de precio al hacer clic en el botón", () => {
      const min = 100;
      const max = 15000;

      cy.get('input[name="precioMin"]').clear().type(min.toString());
      cy.get('input[name="precioMax"]').clear().type(max.toString());
      cy.contains("button", "Aplicar rango de precio").click();

      cy.wait(300);

      // Verificar que cada producto tenga un precio dentro del rango
      cy.get(".product-price").then(($precios) => {
        // Si no hay productos filtrados
        if ($precios.length === 0) {
          // Chequear que realmente no existan productos
          cy.get(".card-producto, .card-horizontal").should("not.exist");
          return; //Salgo del test
        }

        cy.wrap($precios).each(($p) => {
          const price = parseFloat($p.text().replace(/[^\d]/g, ""));
          expect(price).to.be.within(min, max);
        });
      });
    });
  });

  describe("Ordenamiento", () => {
    it("debe permitir desmarcar la opción seleccionada", () => {
      cy.contains("label", "Precio ascendente")
        .find('input[type="radio"]')
        .click()
        .should("be.checked");

      // Hacer clic nuevamente para desmarcar
      cy.contains("label", "Precio ascendente")
        .find('input[type="radio"]')
        .click()
        .should("not.be.checked");
    });
  });
});
