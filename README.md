# Teste Backend
Leia o arquivo `EXAM.txt` extraia os exames e transforme em um arquivo json com a seguinte estrutura:

```
[
  {
    "name": String,
    "result": Number,
    "unit": String,
    "material": String,
    "metodo": String
  },
  [...]
]
``` 
# Sites e funções que podem ajudar

- RegEx (https://regexr.com/)
- String: `trim`, `startsWith`, `endsWith`, `includes`, `replace`, `split` 
- Array: `pop`, `shift`
- StackOverflow (https://stackoverflow.com/)

# Resultado
Resultado esperado

```json
[
  {
    "name": "FLUORETO",
    "result": 1.2,
    "unit": "MG/G",
    "material": "URINA",
    "metodo": "Ise Indireto ­ Íon Seletivo"
  },
  {
    "name": "CÁDMIO",
    "result": 34,
    "unit": "μg/L",
    "material": "Sangue",
    "metodo": "Westergreen"
  },
  {
    "name": "CORTISOL",
    "result": 0.04,
    "unit": "mg/dL",
    "material": "Soro",
    "metodo": "Turbidimétrico"
  },
  {
    "name": "RETICULÓCITOS VALOR ABSOLUTO",
    "result": 14,
    "unit": "x 10³/mm3",
    "material": "SANGUE TOTAL COM EDTA",
    "metodo": "Turbidimétrico"
  },
  {
    "name": "ARSÊNICO",
    "result": 1.5,
    "unit": "mcg/L",
    "material": "SANGUE TOTAL COM EDTA",
    "metodo": "Turbidimétrico"
  },
  {
    "name": "DOSAGEM DE CREATININA",
    "result": 68,
    "unit": "fl",
    "material": "SANGUE TOTAL COM EDTA",
    "metodo": "-"
  }
]
```