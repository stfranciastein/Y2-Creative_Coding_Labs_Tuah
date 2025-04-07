class airField{
    constructor(obj){
        this.numCrafts = obj.numCrafts ?? 5; // Where craft number is decided
        this.width = obj.width ?? 250;
        this.height = obj.height ?? 250;
        this.airFieldPosX = obj.airFieldPosX ?? 250;
        this.airFieldPosY = obj.airFieldPosY ?? 250;
        this.crafts = [];
        this.genCrafts();
    }

    renderAirfield() {
        push();
        translate(this.airFieldPosX, this.airFieldPosY);
    
        // Background: dark greenish radar screen
        fill(10, 40, 10);
        stroke(0, 100, 0);
        strokeWeight(2);
        rect(0, 0, this.width, this.height);
    
        // Grid lines for a radar feel
        stroke(0, 150, 0, 80);
        strokeWeight(1);
    
        for (let x = -this.width / 2; x <= this.width / 2; x += 25) {
            line(x, -this.height / 2, x, this.height / 2);
        }
    
        for (let y = -this.height / 2; y <= this.height / 2; y += 25) {
            line(-this.width / 2, y, this.width / 2, y);
        }
    
        // Crosshair lines
        stroke(0, 255, 0, 100);
        line(0, -this.height / 2, 0, this.height / 2);
        line(-this.width / 2, 0, this.width / 2, 0);
    
        pop();
    }
    

    renderCrafts(){
        push();
        translate(this.airFieldPosX,this.airFieldPosY)
        fill(255, 255, 255);

        this.crafts.forEach((craft,id) => { 
            craft.render(id, id === currentCraft);
            
        });
        pop();
    }

    moveCrafts(){
        this.crafts.forEach(craft => {
            craft.move()
            
        })
    }
    checkpos(craft){
        this.crafts.forEach(craft => {
            if (craft.pos.x > this.width / 2) {
                craft.pos.x = -this.width / 2;
            } else if (craft.pos.x < -this.width / 2) {
                craft.pos.x = this.width / 2;
            }
            if (craft.pos.y > this.height / 2) {
                craft.pos.y = -this.height / 2;
            } else if (craft.pos.y < -this.height / 2) {
                craft.pos.y = this.height / 2;
            }
        })
        
    }

    genCrafts(){
        for(let i = 0; i < this.numCrafts; i++){
            let num = random(0, 1);
            if (num < 0.33) {
                this.crafts.push(new Craft({
                    posX: random(-this.width/2, this.width/2),
                    posY: random(-this.height/2, this.height/2),
                }));
            } else if (num < 0.66) {
                this.crafts.push(new Heli({
                    posX: random(-this.width/2, this.width/2),
                    posY: random(-this.height/2, this.height/2),
                }));
            } else {
                this.crafts.push(new Plane({
                    posX: random(-this.width/2, this.width/2),
                    posY: random(-this.height/2, this.height/2),
                }));
            }
        }
    }
    

    checkDis(){

        this.crafts.forEach(craft => craft.alert = 0)
        let count = 0;
        for(let i = 0; i<this.crafts.length; i++){
            for(let j = i+1; j<this.crafts.length; j++){
                let craftA = this.crafts[i];
                let craftB = this.crafts[j];
                let dist = sqrt(sq(craftA.pos.y - craftB.pos.y) + sq(craftA.pos.x - craftB.pos.x));
                if(dist<30){
                    craftA.alert =true;
                    craftB.alert =true;
                }
                count++
            }
        }
        console.log(count)
        
    }
}