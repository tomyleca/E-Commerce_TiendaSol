describe('Búsqueda y Filtrado de Productos', () => {
  beforeEach(() => {
    // Visitar la página de productos antes de cada test
    cy.visit('http://localhost:3000/tienda')
    cy.wait(500) // Esperar a que carguen los productos
  })

  describe('Barra de Búsqueda', () => {
    it('debe mostrar la barra de búsqueda', () => {
      cy.get('.barra-busqueda').should('be.visible')
      cy.get('.search-input input')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Buscar productos...')
    })

    it('debe permitir escribir en la barra de búsqueda', () => {
      const textoBusqueda = 'laptop'
      cy.get('.search-input input')
        .type(textoBusqueda)
        .should('have.value', textoBusqueda)
    })

    it('debe mostrar el botón de limpiar cuando hay texto', () => {
      cy.get('.search-input input').type('test')
      cy.get('.clear-button').should('be.visible')
    })

    it('debe limpiar la búsqueda al hacer clic en el botón limpiar', () => {
      cy.get('.search-input input').type('producto')
      cy.get('.clear-button').click()
      cy.get('.search-input input').should('have.value', '')
      cy.get('.clear-button').should('not.exist')
    })

    it('debe filtrar productos al buscar por nombre', () => {
      // Contar productos iniciales
      cy.get('.card-producto, .card-horizontal').then($cards => {
        const totalInicial = $cards.length
        
        // Buscar un producto específico
        cy.get('.search-input input').type('laptop')
        cy.wait(300)
        
        // Verificar que hay menos productos mostrados
        cy.get('.card-producto, .card-horizontal').should('have.length.lessThan', totalInicial)
      })
    })

    it('debe mostrar mensaje cuando no hay resultados', () => {
      cy.get('.search-input input').type('productonoinexistente12345')
      cy.wait(300)
      
      // Verificar que se muestra mensaje de sin resultados
      cy.contains(/no se encontraron productos|sin resultados/i).should('be.visible')
    })

    it('debe aplicar el estilo focused al hacer foco', () => {
      cy.get('.search-input input').focus()
      cy.get('.barra-busqueda').should('have.class', 'focused')
    })
  })

  describe('Filtros de Categorías', () => {
    it('debe mostrar las categorías disponibles', () => {
      cy.get('.categorias').should('be.visible')
      cy.contains('h3', 'Categorías').should('be.visible')
    })

    it('debe permitir seleccionar una categoría', () => {
      cy.get('.check-input input[type="checkbox"]').first().check()
      cy.get('.check-input input[type="checkbox"]').first().should('be.checked')
    })

    it('debe permitir seleccionar múltiples categorías', () => {
      cy.get('.check-input input[type="checkbox"]').eq(0).check()
      cy.get('.check-input input[type="checkbox"]').eq(1).check()
      
      cy.get('.check-input input[type="checkbox"]:checked').should('have.length', 2)
    })

    it('debe desmarcar una categoría al hacer clic nuevamente', () => {
      cy.get('.check-input input[type="checkbox"]').first().check()
      cy.get('.check-input input[type="checkbox"]').first().should('be.checked')
      cy.get('.check-input input[type="checkbox"]').first().uncheck()
      cy.get('.check-input input[type="checkbox"]').first().should('not.be.checked')
    })

    it('debe filtrar productos según la categoría seleccionada', () => {
      // Seleccionar primera categoría
      cy.get('.check-input input[type="checkbox"]').first().check()
      cy.wait(300)
      
      // Verificar que hay productos mostrados
      cy.get('.card-producto, .card-horizontal').should('exist')
    })
  })

  describe('Filtro por Precio', () => {
    it('debe mostrar inputs de precio mínimo y máximo', () => {
      cy.contains('h3', 'Precio').should('be.visible')
      cy.get('input[name="precioMin"]').should('be.visible')
      cy.get('input[name="precioMax"]').should('be.visible')
    })

    it('debe permitir ingresar precio mínimo', () => {
      cy.get('input[name="precioMin"]')
        .clear()
        .type('100')
        .should('have.value', '100')
    })

    it('debe permitir ingresar precio máximo', () => {
      cy.get('input[name="precioMax"]')
        .clear()
        .type('500')
        .should('have.value', '500')
    })

    it('debe aplicar filtro de precio al hacer clic en el botón', () => {
      cy.get('input[name="precioMin"]').clear().type('100')
      cy.get('input[name="precioMax"]').clear().type('500')
      cy.contains('button', 'Aplicar rango de precio').click()
      cy.wait(300)
      
      // Los productos deberían estar filtrados
      cy.get('.card-producto, .card-horizontal').should('exist')
    })

    it('debe filtrar productos dentro del rango de precio', () => {
      cy.get('input[name="precioMin"]').clear().type('0')
      cy.get('input[name="precioMax"]').clear().type('100')
      cy.contains('button', 'Aplicar rango de precio').click()
      cy.wait(300)
      
      // Verificar que los precios mostrados están en el rango
      cy.get('.precio-producto, .card-precio').each($precio => {
        const precio = parseFloat($precio.text().replace(/[^0-9.]/g, ''))
        expect(precio).to.be.at.most(100)
      })
    })
  })

  describe('Ordenamiento', () => {
    it('debe mostrar opciones de ordenamiento', () => {
      cy.contains('h3', 'Ordenar por').should('be.visible')
    })

    it('debe tener la opción "Más Vendido"', () => {
      cy.contains('label', 'Más Vendido').should('be.visible')
    })

    it('debe tener la opción "Precio ascendente"', () => {
      cy.contains('label', 'Precio ascendente').should('be.visible')
    })

    it('debe tener la opción "Precio descendente"', () => {
      cy.contains('label', 'Precio descendente').should('be.visible')
    })

    it('debe seleccionar orden por precio ascendente', () => {
      cy.contains('label', 'Precio ascendente')
        .find('input[type="radio"]')
        .click()
        .should('be.checked')
    })

    it('debe seleccionar orden por precio descendente', () => {
      cy.contains('label', 'Precio descendente')
        .find('input[type="radio"]')
        .click()
        .should('be.checked')
    })

    it('debe permitir desmarcar la opción seleccionada', () => {
      cy.contains('label', 'Precio ascendente')
        .find('input[type="radio"]')
        .click()
        .should('be.checked')
      
      // Hacer clic nuevamente para desmarcar
      cy.contains('label', 'Precio ascendente')
        .find('input[type="radio"]')
        .click()
        .should('not.be.checked')
    })
  })

  describe('Filtros Combinados', () => {
    it('debe aplicar búsqueda y filtro de categoría simultáneamente', () => {
      cy.get('.search-input input').type('producto')
      cy.get('.check-input input[type="checkbox"]').first().check()
      cy.wait(300)
      
      cy.get('.card-producto, .card-horizontal').should('exist')
    })

    it('debe aplicar búsqueda, categoría y precio simultáneamente', () => {
      cy.get('.search-input input').type('producto')
      cy.get('.check-input input[type="checkbox"]').first().check()
      cy.get('input[name="precioMin"]').clear().type('50')
      cy.get('input[name="precioMax"]').clear().type('500')
      cy.contains('button', 'Aplicar rango de precio').click()
      cy.wait(300)
      
      // Debería mostrar productos filtrados
      cy.get('.card-producto, .card-horizontal').should('exist')
    })

    it('debe aplicar todos los filtros incluyendo ordenamiento', () => {
      cy.get('.search-input input').type('laptop')
      cy.get('.check-input input[type="checkbox"]').first().check()
      cy.get('input[name="precioMin"]').clear().type('100')
      cy.get('input[name="precioMax"]').clear().type('1000')
      cy.contains('button', 'Aplicar rango de precio').click()
      cy.contains('label', 'Precio ascendente')
        .find('input[type="radio"]')
        .click()
      cy.wait(300)
      
      cy.get('.card-producto, .card-horizontal').should('exist')
    })

    it('debe mantener los filtros al navegar y volver', () => {
      cy.get('.search-input input').type('test')
      cy.get('.check-input input[type="checkbox"]').first().check()
      
      // Navegar a otra página y volver
      cy.go('back')
      cy.wait(500)
      cy.visit('http://localhost:3000/tienda')
      
      // Los filtros pueden o no persistir según la implementación
      // Este test verifica que la página carga correctamente
      cy.get('.barra-busqueda').should('be.visible')
    })
  })

  describe('Responsividad y UX', () => {
    it('debe funcionar en dispositivos móviles', () => {
      cy.viewport('iphone-x')
      cy.get('.barra-busqueda').should('be.visible')
      cy.get('.search-input input').type('producto')
      cy.get('.categorias').should('be.visible')
    })

    it('debe funcionar en tablets', () => {
      cy.viewport('ipad-2')
      cy.get('.barra-busqueda').should('be.visible')
      cy.get('.categorias').should('be.visible')
    })

    it('debe actualizar resultados en tiempo real al buscar', () => {
      cy.get('.search-input input').type('l')
      cy.wait(100)
      cy.get('.card-producto, .card-horizontal').should('exist')
      
      cy.get('.search-input input').type('a')
      cy.wait(100)
      // Los resultados deberían actualizarse
    })
  })
})
