import { Mat3, Mat4, Vec3, Vec4 } from "../lib/TSM.js";

/* A potential interface that students should implement */
interface IMengerSponge {
  setLevel(level: number): void;
  isDirty(): boolean;
  setClean(): void;
  normalsFlat(): Float32Array;
  indicesFlat(): Uint32Array;
  positionsFlat(): Float32Array;
}

/**
 * Represents a Menger Sponge
 */
export class MengerSponge implements IMengerSponge {

  // TODO: sponge data structures
  level: number;
  dirty: boolean;
  normals: Float32Array;
  indicies: Uint32Array;
  positions: Float32Array;
  index: number
  start: number
  constructor(level: number) {
	  this.setLevel(level);
	  // TODO: other initialization	
  }

  /**
   * Returns true if the sponge has changed.
   */
  public isDirty(): boolean {
       return this.dirty;
  }

  public setClean(): void {
    this.dirty = false
  }
  
  public setLevel(level: number)
  {
	  // TODO: initialize the cube
    this.level = level;
    
    // vector * each face * number of faces * num of cubes
    this.positions = new Float32Array(4*6*6 * Math.pow(20, (level - 1)));
    // 2 triangles/face * num of faces
    this.indicies = new Uint32Array(6 * 6 * Math.pow(20, (level - 1)));
    this.normals = new Float32Array(4*6*6* Math.pow(20, (level - 1)));
    this.index = 0;
    this.start = 0;
    this.buildSponge();

  }

  public buildSponge(): void {
    var minx = -0.5;
    var miny = -0.5;
    var minz = -0.5;
    var maxx = 0.5;
    var size = maxx - minx;
    if (this.level == 1){
      this.buildCube(minx, miny, minz, maxx, miny + size, minz + size);
    } else {
      this.recurse(minx, miny, minz, size/3, this.level);

    }
    console.log(this.indicies);
    console.log(this.positions);
  }

  public recurse(minx, miny, minz, size, curLevel): void {
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        for (let k = 0; k < 3; k++){
          //not the middle ones :)
          if (i % 2 + j % 2 + k % 2 < 2){
            if (curLevel > 2){
              this.recurse(minx + i*size, miny + j*size, minz + k*size, size/3, curLevel - 1)
            } else {
              this.buildCube(minx + i*size, miny + j*size, minz + k*size, minx + i*size + size, miny + j*size + size, minz + k*size + size)
              
            }
          }
        }
      }
    }
  }
  /* Returns a flat Float32Array of the sponge's vertex positions */
  public positionsFlat(): Float32Array {
	  // TODO: right now this makes a single triangle. Make the cube fractal instead.
	  // return new Float32Array([1.0, 0.0, 0.0, 1.0, -1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0]);
    return this.positions;
  }

  /**
   * Returns a flat Uint32Array of the sponge's face indices
   */
  public indicesFlat(): Uint32Array {
    // TODO: right now this makes a single triangle. Make the cube fractal instead.
    return this.indicies;
  }
  /**
   * Returns a flat Float32Array of the sponge's normals
   */
  public normalsFlat(): Float32Array {
	  // TODO: right now this makes a single triangle. Make the cube fractal instead.
	  return this.normals;
  }

  /**
   * Returns the model matrix of the sponge
   */
  public uMatrix(): Mat4 {

    // TODO: change this, if it's useful
    const ret : Mat4 = new Mat4().setIdentity();

    return ret;    
  }
  
  public buildCube(minx: number, miny: number, minz: number, maxx: number, maxy: number, maxz: number) {
    
    
    //front face
    this.positions[this.index] = minx;       this.positions[this.index + 1] = miny;     this.positions[this.index + 2] = maxz;     this.positions[this.index + 3] = 1.0;
    this.positions[this.index + 4] = maxx;   this.positions[this.index + 5] = miny;     this.positions[this.index + 6] = maxz;     this.positions[this.index + 7] = 1.0;
    this.positions[this.index + 8] = maxx;   this.positions[this.index + 9] = maxy;     this.positions[this.index + 10] = maxz;     this.positions[this.index + 11] = 1.0;
    this.positions[this.index + 12] = minx;   this.positions[this.index + 13] = miny;     this.positions[this.index + 14] = maxz;     this.positions[this.index + 15] = 1.0;
    this.positions[this.index + 16] = maxx;   this.positions[this.index + 17] = maxy;     this.positions[this.index + 18] = maxz;     this.positions[this.index + 19] = 1.0;
    this.positions[this.index + 20] = minx;   this.positions[this.index + 21] = maxy;     this.positions[this.index + 22] = maxz;     this.positions[this.index + 23] = 1.0;

    this.normals[this.index] = 0.0;          this.normals[this.index + 1] = 0.0;        this.normals[this.index + 2] = 1.0;        this.normals[this.index + 3] = 0.0;
    this.normals[this.index + 4] = 0.0;      this.normals[this.index + 5] = 0.0;        this.normals[this.index + 6] = 1.0;        this.normals[this.index + 7] = 0.0;
    this.normals[this.index + 8] = 0.0;      this.normals[this.index + 9] = 0.0;        this.normals[this.index + 10] = 1.0;        this.normals[this.index + 11] = 0.0;
    this.normals[this.index + 12] = 0.0;      this.normals[this.index + 13] = 0.0;        this.normals[this.index + 14] = 1.0;        this.normals[this.index + 15] = 0.0;
    this.normals[this.index + 16] = 0.0;      this.normals[this.index + 17] = 0.0;        this.normals[this.index + 18] = 1.0;        this.normals[this.index + 19] = 0.0;
    this.normals[this.index + 20] = 0.0;      this.normals[this.index + 21] = 0.0;        this.normals[this.index + 22] = 1.0;        this.normals[this.index + 23] = 0.0;

    this.indicies[this.start] = this.start;           this.indicies[this.start + 1] = this.start + 1;         this.indicies[this.start + 2] = this.start + 2;       
    this.indicies[this.start + 3] = this.start + 3;   this.indicies[this.start + 4] = this.start + 4;         this.indicies[this.start + 5] = this.start + 5;  

    this.index = this.index + 24;
    this.start = this.start + 6

    //left face
    this.positions[this.index] = minx;       this.positions[this.index + 1] = miny;     this.positions[this.index + 2] = maxz;     this.positions[this.index + 3] = 1.0;
    this.positions[this.index + 4] = minx;   this.positions[this.index + 5] = maxy;     this.positions[this.index + 6] = maxz;     this.positions[this.index + 7] = 1.0;
    this.positions[this.index + 8] = minx;   this.positions[this.index + 9] = miny;     this.positions[this.index + 10] = minz;     this.positions[this.index + 11] = 1.0;
    this.positions[this.index + 12] = minx;   this.positions[this.index + 13] = maxy;     this.positions[this.index + 14] = maxz;     this.positions[this.index + 15] = 1.0;
    this.positions[this.index + 16] = minx;   this.positions[this.index + 17] = maxy;     this.positions[this.index + 18] = minz;     this.positions[this.index + 19] = 1.0;
    this.positions[this.index + 20] = minx;   this.positions[this.index + 21] = miny;     this.positions[this.index + 22] = minz;     this.positions[this.index + 23] = 1.0;

    this.normals[this.index] = 1.0;          this.normals[this.index + 1] = 0.0;        this.normals[this.index + 2] = 0.0;        this.normals[this.index + 3] = 0.0;
    this.normals[this.index + 4] = 1.0;      this.normals[this.index + 5] = 0.0;        this.normals[this.index + 6] = 0.0;        this.normals[this.index + 7] = 0.0;
    this.normals[this.index + 8] = 1.0;      this.normals[this.index + 9] = 0.0;        this.normals[this.index + 10] = 0.0;        this.normals[this.index + 11] = 0.0;
    this.normals[this.index + 12] = 1.0;      this.normals[this.index + 13] = 0.0;        this.normals[this.index + 14] = 0.0;        this.normals[this.index + 15] = 0.0;
    this.normals[this.index + 16] = 1.0;      this.normals[this.index + 17] = 0.0;        this.normals[this.index + 18] = 0.0;        this.normals[this.index + 19] = 0.0;
    this.normals[this.index + 20] = 1.0;      this.normals[this.index + 21] = 0.0;        this.normals[this.index + 22] = 0.0;        this.normals[this.index + 23] = 0.0;

    this.indicies[this.start] = this.start;           this.indicies[this.start + 1] = this.start + 1;         this.indicies[this.start + 2] = this.start + 2;       
    this.indicies[this.start + 3] = this.start + 3;   this.indicies[this.start + 4] = this.start + 4;         this.indicies[this.start + 5] = this.start + 5;  

    this.index = this.index + 24;
    this.start = this.start + 6


    //back face
    this.positions[this.index] = minx;       this.positions[this.index + 1] = miny;     this.positions[this.index + 2] = minx;     this.positions[this.index + 3] = 1.0;
    this.positions[this.index + 4] = maxx;   this.positions[this.index + 5] = maxy;     this.positions[this.index + 6] = minz;     this.positions[this.index + 7] = 1.0;
    this.positions[this.index + 8] = maxx;   this.positions[this.index + 9] = miny;     this.positions[this.index + 10] = minz;     this.positions[this.index + 11] = 1.0;
    this.positions[this.index + 12] = minx;   this.positions[this.index + 13] = miny;     this.positions[this.index + 14] = minz;     this.positions[this.index + 15] = 1.0;
    this.positions[this.index + 16] = minx;   this.positions[this.index + 17] = maxy;     this.positions[this.index + 18] = minz;     this.positions[this.index + 19] = 1.0;
    this.positions[this.index + 20] = maxx;   this.positions[this.index + 21] = maxy;     this.positions[this.index + 22] = minz;     this.positions[this.index + 23] = 1.0;

    this.normals[this.index] = 0.0;          this.normals[this.index + 1] = 0.0;        this.normals[this.index + 2] = 1.0;        this.normals[this.index + 3] = 0.0;
    this.normals[this.index + 4] = 0.0;      this.normals[this.index + 5] = 0.0;        this.normals[this.index + 6] = 1.0;        this.normals[this.index + 7] = 0.0;
    this.normals[this.index + 8] = 0.0;      this.normals[this.index + 9] = 0.0;        this.normals[this.index + 10] = 1.0;        this.normals[this.index + 11] = 0.0;
    this.normals[this.index + 12] = 0.0;      this.normals[this.index + 13] = 0.0;        this.normals[this.index + 14] = 1.0;        this.normals[this.index + 15] = 0.0;
    this.normals[this.index + 16] = 0.0;      this.normals[this.index + 17] = 0.0;        this.normals[this.index + 18] = 1.0;        this.normals[this.index + 19] = 0.0;
    this.normals[this.index + 20] = 0.0;      this.normals[this.index + 21] = 0.0;        this.normals[this.index + 22] = 1.0;        this.normals[this.index + 23] = 0.0;

    this.indicies[this.start] = this.start;           this.indicies[this.start + 1] = this.start + 1;         this.indicies[this.start + 2] = this.start + 2;       
    this.indicies[this.start + 3] = this.start + 3;   this.indicies[this.start + 4] = this.start + 4;         this.indicies[this.start + 5] = this.start + 5;  

    this.index = this.index + 24;
    this.start = this.start + 6


    //right face
    this.positions[this.index] = maxx;       this.positions[this.index + 1] = miny;     this.positions[this.index + 2] = maxz;     this.positions[this.index + 3] = 1.0;
    this.positions[this.index + 4] = maxx;   this.positions[this.index + 5] = miny;     this.positions[this.index + 6] = minz;     this.positions[this.index + 7] = 1.0;
    this.positions[this.index + 8] = maxx;   this.positions[this.index + 9] = maxy;     this.positions[this.index + 10] = maxz;     this.positions[this.index + 11] = 1.0;
    this.positions[this.index + 12] = maxx;   this.positions[this.index + 13] = maxy;     this.positions[this.index + 14] = maxz;     this.positions[this.index + 15] = 1.0;
    this.positions[this.index + 16] = maxx;   this.positions[this.index + 17] = miny;     this.positions[this.index + 18] = minz;     this.positions[this.index + 19] = 1.0;
    this.positions[this.index + 20] = maxx;   this.positions[this.index + 21] = maxy;     this.positions[this.index + 22] = minz;     this.positions[this.index + 23] = 1.0;

    this.normals[this.index] = 1.0;          this.normals[this.index + 1] = 0.0;        this.normals[this.index + 2] = 0.0;        this.normals[this.index + 3] = 0.0;
    this.normals[this.index + 4] = 1.0;      this.normals[this.index + 5] = 0.0;        this.normals[this.index + 6] = 0.0;        this.normals[this.index + 7] = 0.0;
    this.normals[this.index + 8] = 1.0;      this.normals[this.index + 9] = 0.0;        this.normals[this.index + 10] = 0.0;        this.normals[this.index + 11] = 0.0;
    this.normals[this.index + 12] = 1.0;      this.normals[this.index + 13] = 0.0;        this.normals[this.index + 14] = 0.0;        this.normals[this.index + 15] = 0.0;
    this.normals[this.index + 16] = 1.0;      this.normals[this.index + 17] = 0.0;        this.normals[this.index + 18] = 0.0;        this.normals[this.index + 19] = 0.0;
    this.normals[this.index + 20] = 1.0;      this.normals[this.index + 21] = 0.0;        this.normals[this.index + 22] = 0.0;        this.normals[this.index + 23] = 0.0;

    this.indicies[this.start] = this.start;           this.indicies[this.start + 1] = this.start + 1;         this.indicies[this.start + 2] = this.start + 2;       
    this.indicies[this.start + 3] = this.start + 3;   this.indicies[this.start + 4] = this.start + 4;         this.indicies[this.start + 5] = this.start + 5;  

    this.index = this.index + 24;
    this.start = this.start + 6

    //top face
    this.positions[this.index] = minx;       this.positions[this.index + 1] = maxy;     this.positions[this.index + 2] = maxz;     this.positions[this.index + 3] = 1.0;
    this.positions[this.index + 4] = maxx;   this.positions[this.index + 5] = maxy;     this.positions[this.index + 6] = maxz;     this.positions[this.index + 7] = 1.0;
    this.positions[this.index + 8] = maxx;   this.positions[this.index + 9] = maxy;     this.positions[this.index + 10] = minz;     this.positions[this.index + 11] = 1.0;
    this.positions[this.index + 12] = minx;   this.positions[this.index + 13] = maxy;     this.positions[this.index + 14] = maxz;     this.positions[this.index + 15] = 1.0;
    this.positions[this.index + 16] = maxx;   this.positions[this.index + 17] = maxy;     this.positions[this.index + 18] = minz;     this.positions[this.index + 19] = 1.0;
    this.positions[this.index + 20] = minx;   this.positions[this.index + 21] = maxy;     this.positions[this.index + 22] = minz;     this.positions[this.index + 23] = 1.0;

    this.normals[this.index] = 0.0;          this.normals[this.index + 1] = 1.0;        this.normals[this.index + 2] = 0.0;        this.normals[this.index + 3] = 0.0;
    this.normals[this.index + 4] = 0.0;      this.normals[this.index + 5] = 1.0;        this.normals[this.index + 6] = 0.0;        this.normals[this.index + 7] = 0.0;
    this.normals[this.index + 8] = 0.0;      this.normals[this.index + 9] = 1.0;        this.normals[this.index + 10] = 0.0;        this.normals[this.index + 11] = 0.0;
    this.normals[this.index + 12] = 0.0;      this.normals[this.index + 13] = 1.0;        this.normals[this.index + 14] = 0.0;        this.normals[this.index + 15] = 0.0;
    this.normals[this.index + 16] = 0.0;      this.normals[this.index + 17] = 1.0;        this.normals[this.index + 18] = 0.0;        this.normals[this.index + 19] = 0.0;
    this.normals[this.index + 20] = 0.0;      this.normals[this.index + 21] = 1.0;        this.normals[this.index + 22] = 0.0;        this.normals[this.index + 23] = 0.0;

    this.indicies[this.start] = this.start;           this.indicies[this.start + 1] = this.start + 1;         this.indicies[this.start + 2] = this.start + 2;       
    this.indicies[this.start + 3] = this.start + 3;   this.indicies[this.start + 4] = this.start + 4;         this.indicies[this.start + 5] = this.start + 5;  

    this.index = this.index + 24;
    this.start = this.start + 6

    //bot face
    this.positions[this.index] = minx;       this.positions[this.index + 1] = miny;     this.positions[this.index + 2] = maxz;     this.positions[this.index + 3] = 1.0;
    this.positions[this.index + 4] = maxx;   this.positions[this.index + 5] = miny;     this.positions[this.index + 6] = minz;     this.positions[this.index + 7] = 1.0;
    this.positions[this.index + 8] = maxx;   this.positions[this.index + 9] = miny;     this.positions[this.index + 10] = maxz;     this.positions[this.index + 11] = 1.0;
    this.positions[this.index + 12] = minx;   this.positions[this.index + 13] = miny;     this.positions[this.index + 14] = maxz;     this.positions[this.index + 15] = 1.0;
    this.positions[this.index + 16] = minx;   this.positions[this.index + 17] = miny;     this.positions[this.index + 18] = minz;     this.positions[this.index + 19] = 1.0;
    this.positions[this.index + 20] = maxx;   this.positions[this.index + 21] = miny;     this.positions[this.index + 22] = minz;     this.positions[this.index + 23] = 1.0;

    this.normals[this.index] = 0.0;          this.normals[this.index + 1] = 1.0;        this.normals[this.index + 2] = 0.0;        this.normals[this.index + 3] = 0.0;
    this.normals[this.index + 4] = 0.0;      this.normals[this.index + 5] = 1.0;        this.normals[this.index + 6] = 0.0;        this.normals[this.index + 7] = 0.0;
    this.normals[this.index + 8] = 0.0;      this.normals[this.index + 9] = 1.0;        this.normals[this.index + 10] = 0.0;        this.normals[this.index + 11] = 0.0;
    this.normals[this.index + 12] = 0.0;      this.normals[this.index + 13] = 1.0;        this.normals[this.index + 14] = 0.0;        this.normals[this.index + 15] = 0.0;
    this.normals[this.index + 16] = 0.0;      this.normals[this.index + 17] = 1.0;        this.normals[this.index + 18] = 0.0;        this.normals[this.index + 19] = 0.0;
    this.normals[this.index + 20] = 0.0;      this.normals[this.index + 21] = 1.0;        this.normals[this.index + 22] = 0.0;        this.normals[this.index + 23] = 0.0;

    this.indicies[this.start] = this.start;           this.indicies[this.start + 1] = this.start + 1;         this.indicies[this.start + 2] = this.start + 2;       
    this.indicies[this.start + 3] = this.start + 3;   this.indicies[this.start + 4] = this.start + 4;         this.indicies[this.start + 5] = this.start + 5;  

    this.index = this.index + 24;
    this.start = this.start + 6

  }
}
