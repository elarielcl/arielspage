const express = require('express');

const router = new express.Router();
const data = [{name: "Auxiliar 1", route: "1", info: "#Auxiliar 1\n##P1\n###a)\nEsta es la resolucion del P1 a)"},
    {name: "Auxiliar 2", route: "2", info: "#Auxiliar 2"},
    {name: "Auxiliar 3", route: "3", info: "#Auxiliar 3"},
    {name: "Auxiliar 4", route: "4", info: "#Auxiliar 4"},
    {name: "Máximo Común Divisor", route: "mcd", info: "#Correctitud: Algoritmo de Euclides\n\nEl algoritmo de Euclides nos entrega el \"máximo común divisor\"(mcd) entre dos números naturales.\n\n    mcd(m, n):\n        r = m mod n\n        if r == 0:\n            return n\n        return mcd(n,r)\nPara mostrar la correctitud de este algoritmo debemos demostrar 2 cosas.\n##Finitud\nEste algoritmo se detiene para todo par de naturales, pues (asumiendo que $m\\ge n$) se cumple que $m\\ge n$ y $n\\ge r$, por lo que los argumentos de la función mcd se van achicando con cada llamada recursiva.\n##Respuesta correcta\nPara verificar que lo que entrega el algoritmo como respuesta es correcta basta con ver que $mcd(m,n)=mcd(n,r)$.\n\nPara ver esto mostraremos que los divisores de $m$ y $n$ son los mismos que los divisores de $n$ y $r$, y por lo tanto, el mcd será el mismo.\n\nNotemos para esta última parte que $$m=nq+r$$\n, por lo que un divisor de $n$ y $r$ también es divisor de $m$. Ahora, si tenemos un divisor de $n$ y $m$, por ser $$r = m - nq$$, este será divisor de $r$ también.\nY, por lo tanto, los divisores de $m$ y $n$ son los mismos que los divisores de $n$ y $r$. Terminando con esto la dmeostración."},
]
router.get('/getAuxiliarsNamesAndRoutes',(req, res) => {
    return res.status(200).json(data.map((auxiliar) => {return {name: auxiliar.name, route: auxiliar.route}}));
});

router.post('/getAuxiliarsInfo/:route',(req, res) => {
    const route = req.body.route;
    const info = data.filter((auxiliar) => {return route === auxiliar.route});
    if (info.length > 0) return res.status(200).json({info: info[0].info})
    return res.status(400).end();
});









module.exports = router;
