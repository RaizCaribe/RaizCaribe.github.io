const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

/* Empresas Inf */

const empresasInfo = {
    "Despensa Caribe": "Despensa Caribe reúne productos de consumo diario, conservas, harinas, snacks y alimentos saludables elaborados por marcas del ecosistema Raíz.",
    
    "Panadería Raíz": "Panadería Raíz integra productos de panadería y repostería, incluyendo alternativas artesanales, saludables y opciones sin gluten.",
    
    "Frescos del Campo": "Frescos del Campo conecta a productores locales con consumidores y aliados interesados en alimentos frescos, responsables y de origen regional.",
    
    "Agrolab Raíz": "Agrolab Raíz es la línea de formación, innovación y acompañamiento para emprendedores agroindustriales."
};

const empresaCards = document.querySelectorAll(".empresa-card");

const empresaInfo = document.getElementById("empresaInfo");

empresaCards.forEach(card => {
    card.addEventListener("click", () => {

        const empresa = card.getAttribute("data-empresa");

        empresaInfo.textContent = empresasInfo[empresa];
    });
});


const productos = [
    {
        nombre: "Harina artesanal de yuca",
        categoria: "despensa",
        consumidor: "tradicional",
        atributos: ["artesanal", "sin conservantes"],
        presentacion: "500 g",
        icono: "img/harina.jpg",
        descripcion: "Harina natural elaborada a partir de yuca seleccionada, ideal para preparaciones tradicionales."
    },
    {
        nombre: "Pan sin gluten",
        categoria: "panaderia",
        consumidor: "saludable",
        atributos: ["sin gluten", "artesanal"],
        presentacion: "Unidad 350 g",
        icono: "img/pan.jpg",
        descripcion: "Producto de panadería pensado para consumidores que buscan alternativas libres de gluten."
    },
    {
        nombre: "Mermelada tropical",
        categoria: "despensa",
        consumidor: "gourmet",
        atributos: ["artesanal", "sin conservantes"],
        presentacion: "250 g",
        icono: "img/mermelada.jpg",
        descripcion: "Mermelada elaborada con frutas tropicales, ideal para desayunos, postres y acompañamientos."
    },
    {
        nombre: "Bebida natural de frutas",
        categoria: "bebidas",
        consumidor: "saludable",
        atributos: ["sin conservantes", "artesanal"],
        presentacion: "300 ml",
        icono: "img/bebidas.jpg",
        descripcion: "Bebida refrescante elaborada con frutas naturales de la región Caribe."
    },
    {
        nombre: "Vegetales frescos seleccionados",
        categoria: "frescos",
        consumidor: "vegano",
        atributos: ["organico"],
        presentacion: "Bolsa 1 kg",
        icono: "img/vegetales.jpg",
        descripcion: "Vegetales frescos provenientes de productores locales comprometidos con prácticas sostenibles."
    },
    {
        nombre: "Empanadas artesanales",
        categoria: "congelados",
        consumidor: "tradicional",
        atributos: ["artesanal"],
        presentacion: "Paquete x 10 unidades",
        icono: "img/empanadas.jpg",
        descripcion: "Producto artesanal, práctico para hogares, tiendas y distribuidores."
    },
    {
        nombre: "Snack saludable de plátano",
        categoria: "despensa",
        consumidor: "saludable",
        atributos: ["sin gluten", "sin conservantes"],
        presentacion: "80 g",
        icono: "img/platano.jpg",
        descripcion: "Snack crocante de plátano, ideal para consumidores que buscan opciones naturales."
    },
    {
        nombre: "Producto orgánico para exportación",
        categoria: "frescos",
        consumidor: "gourmet",
        atributos: ["organico", "sin conservantes"],
        presentacion: "Según requerimiento",
        icono: "img/organico.jpg",
        descripcion: "Producto seleccionado con potencial de exportación para mercados especializados."
    }
];

const productGrid = document.getElementById("productGrid");

function mostrarProductos(listaProductos) {

    productGrid.innerHTML = "";

    if (listaProductos.length === 0) {
        productGrid.innerHTML = `
            <p class="no-results">
                No se encontraron productos con esos filtros.
            </p>
        `;
        return;
    }

    listaProductos.forEach(producto => {

        const atributosHTML = producto.atributos.map(atributo => {
            return `<span>${atributo}</span>`;
        }).join("");

        const card = document.createElement("article");
        card.classList.add("product-card");

        card.innerHTML = `
            <div class="product-image">
                <img src="${producto.icono}" alt="${producto.nombre}">
            </div>

            <div class="product-content">
                <h3>${producto.nombre}</h3>

                <p>${producto.descripcion}</p>

                <p><strong>Presentación:</strong> ${producto.presentacion}</p>

                <div class="attributes">
                    ${atributosHTML}
                </div>

                <a 
                    class="btn primary" 
                    target="_blank"
                    href="https://wa.me/573122725438?text=Hola,%20quiero%20información%20sobre%20${encodeURIComponent(producto.nombre)}"
                >
                    Quiero este producto
                </a>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

mostrarProductos(productos);


/* Filtros */

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const consumerFilter = document.getElementById("consumerFilter");
const attributeFilter = document.getElementById("attributeFilter");

function filtrarProductos() {

    const busqueda = searchInput.value.toLowerCase();
    const categoria = categoryFilter.value;
    const consumidor = consumerFilter.value;
    const atributo = attributeFilter.value;

    const productosFiltrados = productos.filter(producto => {

        const coincideBusqueda = 
            producto.nombre.toLowerCase().includes(busqueda) ||
            producto.descripcion.toLowerCase().includes(busqueda) ||
            producto.atributos.join(" ").toLowerCase().includes(busqueda);

        const coincideCategoria = 
            categoria === "todos" || producto.categoria === categoria;

        const coincideConsumidor = 
            consumidor === "todos" || producto.consumidor === consumidor;

        const coincideAtributo = 
            atributo === "todos" || producto.atributos.includes(atributo);

        return coincideBusqueda && coincideCategoria && coincideConsumidor && coincideAtributo;
    });

    mostrarProductos(productosFiltrados);
}

searchInput.addEventListener("input", filtrarProductos);
categoryFilter.addEventListener("change", filtrarProductos);
consumerFilter.addEventListener("change", filtrarProductos);
attributeFilter.addEventListener("change", filtrarProductos);


/* Formulario */

const downloadForm = document.getElementById("downloadForm");
const formMessage = document.getElementById("formMessage");

downloadForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const empresa = document.getElementById("empresa").value;
    const correo = document.getElementById("correo").value;
    const interes = document.getElementById("interes").value;

    formMessage.textContent = `Gracias, ${nombre}. Tus datos fueron registrados. Pronto recibirás el catálogo de Raíz Caribe.`;

    downloadForm.reset();
});


/* ChatIA*/

const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

chatToggle.addEventListener("click", () => {
    chatWindow.classList.toggle("active");
});

closeChat.addEventListener("click", () => {
    chatWindow.classList.remove("active");
});

function obtenerRespuesta(mensaje) {

    const texto = mensaje.toLowerCase();

    if (texto.includes("sin gluten")) {
        return "Tenemos productos sin gluten como pan sin gluten y snacks saludables. Puedes revisarlos en el catálogo usando el filtro de atributos.";
    }

    if (texto.includes("producto") || texto.includes("catálogo") || texto.includes("catalogo")) {
        return "Puedes explorar el catálogo inteligente y filtrar por categoría, consumidor o atributo.";
    }

    if (texto.includes("distribuidor") || texto.includes("comprador")) {
        return "Si eres comprador o distribuidor, puedes revisar el portafolio y contactarnos directamente por WhatsApp.";
    }

    if (texto.includes("agrolab") || texto.includes("emprendedor")) {
        return "Agrolab Raíz acompaña emprendedores con formación, programas y convocatorias. Puedes inscribirte desde la sección Agrolab.";
    }

    if (texto.includes("contacto") || texto.includes("whatsapp")) {
        return "Puedes comunicarte con Raíz Caribe por WhatsApp, correo o Instagram desde la sección de contacto.";
    }

    return "Gracias por escribirnos. Puedo orientarte sobre productos, catálogo, Agrolab, distribuidores o contacto.";
}

chatForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const mensajeUsuario = chatInput.value.trim();

    if (mensajeUsuario === "") {
        return;
    }

    const userMessage = document.createElement("p");
    userMessage.classList.add("user-message");
    userMessage.textContent = mensajeUsuario;
    chatBody.appendChild(userMessage);

    const respuestaBot = obtenerRespuesta(mensajeUsuario);

    const botMessage = document.createElement("p");
    botMessage.classList.add("bot-message");
    botMessage.textContent = respuestaBot;

    setTimeout(() => {
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);

    chatInput.value = "";

    chatBody.scrollTop = chatBody.scrollHeight;
});