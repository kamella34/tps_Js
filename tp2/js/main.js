import createMarkup from "./methode.js"

let select1;
let select2;
let select3;

async function fetchRegion() {

    const r = await fetch('https://geo.api.gouv.fr/regions')
    if (r.ok === true) {
        createMarkup('main', ``, document.body, [{ name: "class", value: "main  text-center  border border-dark rounded" }, { name: "id", value: "main" }]);
        createMarkup('div', ``, main, [{ name: "class", value: "div m-3 " }, { name: "id", value: "div1" }]);
        createMarkup('label', ` Regions `, document.getElementById('div1'), [{ name: "class", value: "label mb-3" }, { name: "id", value: "label1" }]);
        select1 = createMarkup('select', ``, document.getElementById('div1'), [{ name: "class", value: "selecteur form-select" }, { name: "id", value: "select1" }]);
        createMarkup('option', `Selctionnez une région `, select1, [{ name: "class", value: "label me-2" }, { name: "id", value: "label1" }, { name: "selected", value: "" }]);

        fetch('https://geo.api.gouv.fr/regions')
            .then(function (reponse) {
                return reponse.json()
            })
            .then(function (dataRegions) {
                // console.log(dataRegions)
                dataRegions.forEach(element => {
                    createMarkup('option', `${element.nom}`, select1, [{ name: "class", value: "option" }, { name: "id", value: `dep${element.code}` }, { name: "value", value: `${element.code}` }])
                })
            })
            .catch(function (error) {
                console.log('regions:', error);
            })

            .then(function () {

                select1.onchange = function (event) {
                    event.preventDefault();

                    let CodeRegion = this.value;


                    createMarkup('div', ``, main, [{ name: "class", value: "div m-3" }, { name: "id", value: "div2" }]);
                    createMarkup('label', ` Departements `, document.getElementById('div2'), [{ name: "class", value: "label mb-3" }, { name: "id", value: "label2" }]);
                    select2 = createMarkup('select', ``, document.getElementById('div2'), [{ name: "class", value: "selecteur form-select" }, { name: "id", value: "select2" }]);
                    createMarkup('option', `Selctionnez un departement`, select2, [{ name: "class", value: "label me-2" }, { name: "id", value: "label1" }, { name: "selected", value: "" }]);

                    fetch(`https://geo.api.gouv.fr/regions/${CodeRegion}/departements`)

                        .then(function (reponse) {
                            if (reponse.ok) {
                                return reponse.json()
                            } else {
                                throw new Error('Erreur lors de la requête');
                            }
                        })
                        .then(function (dataDepartements) {
                            console.log(dataDepartements);

                            dataDepartements.forEach(element => {
                                createMarkup('option', `${element.nom}`, select2, [{ name: "class", value: "option" }, { name: "id", value: `id${element.code}` }, { name: "value", value: `${element.code}` }]);
                            })

                        })
                        .catch(function (error) {
                            console.log('departement:', error);
                        })

                        .then(function () {
                         
                            select2.onchange = function (event) {
                                event.preventDefault();

                                let codeD = this.value;
                                // console.log(`code`, codeD);
                                createMarkup('div', ``, main, [{ name: "class", value: "div m-3" }, { name: "id", value: "div3" }]);
                                createMarkup('label', ` Communes `, document.getElementById('div3'), [{ name: "class", value: "label mb-3" }, { name: "id", value: "label3" }]);
                                select3 = createMarkup('select', ``, document.getElementById('div3'), [{ name: "class", value: "selecteur form-select" }, { name: "id", value: "select3" }]);
                                createMarkup('option', `Selctionnez une commune `, select3, [{ name: "class", value: "label me-2" }, { name: "id", value: "label1" }, { name: "selected", value: "" }]);

                                fetch(`https://geo.api.gouv.fr/departements/${codeD}/communes`)

                                    .then(function (reponse) {
                                        if (reponse.ok) {
                                            return reponse.json()
                                        } else {
                                            throw new Error('Erreur lors de la requête');
                                        }
                                    })
                                    .then(function (dataCommunes) {
                                        // console.log(dataCommunes[0]. population)
                                        dataCommunes.forEach(element => {
                                            createMarkup('option', `${element.nom}`, select3, [{ name: "class", value: "option" }, { name: "id", value: `` }, { name: "value", value: `${element.code}` }]);
                                            // console.log(element.population);
                                        })
                                    })
                                    .then(function () {
                                
                                        select3.onchange = function (event) {
                                            event.preventDefault();

                                            let codesP = this.value;
                                            // console.log(`codeP`, codesP);
                                            createMarkup('div', ``, main, [{ name: "class", value: "div m-5  bg-opacity-10 border  rounded" }, { name: "id", value: "div4" }]);

                                            fetch(`https://geo.api.gouv.fr/communes/${codesP}`)

                                                .then(function (reponse) {
                                                    if (reponse.ok) {
                                                        return reponse.json()
                                                    } else {
                                                        throw new Error('Erreur lors de la requête');
                                                    }
                                                })
                                                .then(function (dataville) {
                                                    // console.log(dataville);
                                                    createMarkup('p', `Commune : ${dataville.nom}`, document.getElementById('div4'), [{ name: "class", value: "selecteur" }, { name: "id", value: "select3" }, { name: "value", value: `${dataville.nom}` }]);
                                                    createMarkup('p', `Code postal : ${dataville.codesPostaux}`, document.getElementById('div4'), [{ name: "class", value: "selecteur" }, { name: "id", value: "select3" }, { name: "value", value: `${dataville.codesPostaux}` }]);
                                                    createMarkup('p', `Population : ${dataville.population}`, document.getElementById('div4'), [{ name: "class", value: "selecteur" }, { name: "id", value: "select3" }, { name: "value", value: `${dataville.population}` }]);
                                                })
                                                .catch(function (error) {
                                                    console.log('ville:', error);
                                                })
                                        }
                                    })
                            }
                        })
                }
            })
    } else {
        throw new Error('impossible de contacter le serveur')
    }
}

fetchRegion()

