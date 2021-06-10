// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

/**
 * returns a speices object
 * @parm {id} : gives the object a unique ID : number
 * @parm {DNA} : Defines the 15 base strand : array
 * @method .mutate() --> randomly selects a single part of the genomic sequence and replaces
 * is with a different base
 * @method .compareDNA() --> Compares two pAequorFactory objects and returns how much of there genome
 * is similar in terms of % matching pairs
 * @method .willLikelySurvive() --> looks at the number of 'C' and 'G' bases in DNA and returns
 * true if they make up 60% or more of the genome
 * @returns: Specices object with two keys value pairs
 */
const pAequorFactory = (id, DNA) => {
  if(typeof id != 'number') {
    console.log("Please pass the right type of data. (number, array)")
  }
  return _ = {
    specimenNum: id,
    dna: DNA, 
    get specimenNum () {
      return this.specimenNum
    },
    get DNA () {
      return this.DNA
    },
    set specimenNum (num) {
      if(num === 'number') {
        this.specimenNum = num;
      }
    },
    mutate() {
      const rando = Math.floor(Math.random()*15)
      let dnaBase = this.dna[rando];
      let mutation = returnRandBase();
      while(dnaBase === mutation){
        mutation = returnRandBase()
      }
      this.dna[rando] = mutation;
    },
    compareDNA(obj) {
      let numMatch = 0;
      for(i = 0; i < obj['dna'].length; i++) {
        if(obj.dna[i] === this.dna[i]) {
          numMatch += 1;
        }
      }
      console.log(numMatch)
      let percMatch = ((numMatch/obj['dna'].length)*100).toFixed(2)
      console.log(`${obj.specimenNum} and ${this.specimenNum} have ${percMatch}% bases in common.`)
    },
    willLikelySurvive() {
      let goodBase = 0;
      this.dna.forEach(base => {
        if (base === 'C' || base === "G") {
          goodBase += 1;
        }
      })
      if (goodBase/this['dna'].length >= .6) {
        return true;
      }
      else {
        return false;
      }
    },

  }
}

// Creating a mock setup to generate 30 oraganisms that could be studied later

const survivingpAeqour = [];
for (i = 1; survivingpAeqour.length < 30; i++) {
  let oraganism = pAequorFactory(i, mockUpStrand());
  if (oraganism.willLikelySurvive()) {
    survivingpAeqour.push(oraganism);
  }
}
console.log(survivingpAeqour.length)
