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
    this.positions = new Float32Array(4*6*6 * Math.pow(27, (level - 1)));
    // 2 triangles/face * num of faces
    this.indicies = new Uint32Array(6 * 6 * Math.pow(27, (level - 1)));
    this.normals = new Float32Array(4*6*6* Math.pow(27, (level - 1)));
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
      this.buildCube(minx, miny, minz, maxx, miny + size, minz + size, this.start, this.index);
    } else {
      this.recurse(minx, miny, minz, size/3, this.level, this.start, this.index);
    }
  }

  public recurse(minx, miny, minz, size, curLevel, start, index): void {
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
        for (var k = 0; k < 0; k++){
          //not the middle one :)
          if (i % 2 + j % 2 + k % 2 < 2){
            if (curLevel > 2){
              this.recurse(minx + i*size, miny + j*size, minz + k*size, size/3, curLevel - 1, this.start, this.index)
            } else {
              this.buildCube(minx + i*size, miny + j*size, minz + k*size, minx + i*size + size, miny + j*size + size, minz + k*size + size, this.start, this.index)
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
  
  public buildCube(minx: number, miny: number, minz: number, maxx: number, maxy: number, maxz: number, start: number, index:number) {

    //front face
    this.positions[index] = minx;       this.positions[index + 1] = miny;     this.positions[index + 2] = maxz;     this.positions[index + 3] = 1.0;
    this.positions[index + 4] = maxx;   this.positions[index + 5] = miny;     this.positions[index + 6] = maxz;     this.positions[index + 7] = 1.0;
    this.positions[index + 8] = maxx;   this.positions[index + 9] = maxy;     this.positions[index + 10] = maxz;     this.positions[index + 11] = 1.0;
    this.positions[index + 12] = minx;   this.positions[index + 13] = miny;     this.positions[index + 14] = maxz;     this.positions[index + 15] = 1.0;
    this.positions[index + 16] = maxx;   this.positions[index + 17] = maxy;     this.positions[index + 18] = maxz;     this.positions[index + 19] = 1.0;
    this.positions[index + 20] = minx;   this.positions[index + 21] = maxy;     this.positions[index + 22] = maxz;     this.positions[index + 23] = 1.0;

    this.normals[index] = 0.0;          this.normals[index + 1] = 0.0;        this.normals[index + 2] = 1.0;        this.normals[index + 3] = 0.0;
    this.normals[index + 4] = 0.0;      this.normals[index + 5] = 0.0;        this.normals[index + 6] = 1.0;        this.normals[index + 7] = 0.0;
    this.normals[index + 8] = 0.0;      this.normals[index + 9] = 0.0;        this.normals[index + 10] = 1.0;        this.normals[index + 11] = 0.0;
    this.normals[index + 12] = 0.0;      this.normals[index + 13] = 0.0;        this.normals[index + 14] = 1.0;        this.normals[index + 15] = 0.0;
    this.normals[index + 16] = 0.0;      this.normals[index + 17] = 0.0;        this.normals[index + 18] = 1.0;        this.normals[index + 19] = 0.0;
    this.normals[index + 20] = 0.0;      this.normals[index + 21] = 0.0;        this.normals[index + 22] = 1.0;        this.normals[index + 23] = 0.0;

    this.indicies[start] = start;           this.indicies[start + 1] = start + 1;         this.indicies[start + 2] = start + 2;       
    this.indicies[start + 3] = start + 3;   this.indicies[start + 4] = start + 4;         this.indicies[start + 5] = start + 5;  

    index = index + 24;
    start = start + 6

    //left face
    this.positions[index] = minx;       this.positions[index + 1] = miny;     this.positions[index + 2] = maxz;     this.positions[index + 3] = 1.0;
    this.positions[index + 4] = minx;   this.positions[index + 5] = maxy;     this.positions[index + 6] = maxz;     this.positions[index + 7] = 1.0;
    this.positions[index + 8] = minx;   this.positions[index + 9] = miny;     this.positions[index + 10] = minz;     this.positions[index + 11] = 1.0;
    this.positions[index + 12] = minx;   this.positions[index + 13] = maxy;     this.positions[index + 14] = maxz;     this.positions[index + 15] = 1.0;
    this.positions[index + 16] = minx;   this.positions[index + 17] = maxy;     this.positions[index + 18] = minz;     this.positions[index + 19] = 1.0;
    this.positions[index + 20] = minx;   this.positions[index + 21] = miny;     this.positions[index + 22] = minz;     this.positions[index + 23] = 1.0;

    this.normals[index] = 1.0;          this.normals[index + 1] = 0.0;        this.normals[index + 2] = 0.0;        this.normals[index + 3] = 0.0;
    this.normals[index + 4] = 1.0;      this.normals[index + 5] = 0.0;        this.normals[index + 6] = 0.0;        this.normals[index + 7] = 0.0;
    this.normals[index + 8] = 1.0;      this.normals[index + 9] = 0.0;        this.normals[index + 10] = 0.0;        this.normals[index + 11] = 0.0;
    this.normals[index + 12] = 1.0;      this.normals[index + 13] = 0.0;        this.normals[index + 14] = 0.0;        this.normals[index + 15] = 0.0;
    this.normals[index + 16] = 1.0;      this.normals[index + 17] = 0.0;        this.normals[index + 18] = 0.0;        this.normals[index + 19] = 0.0;
    this.normals[index + 20] = 1.0;      this.normals[index + 21] = 0.0;        this.normals[index + 22] = 0.0;        this.normals[index + 23] = 0.0;

    this.indicies[start] = start;           this.indicies[start + 1] = start + 1;         this.indicies[start + 2] = start + 2;       
    this.indicies[start + 3] = start + 3;   this.indicies[start + 4] = start + 4;         this.indicies[start + 5] = start + 5;  

    index = index + 24;
    start = start + 6

    //back face
    this.positions[index] = minx;       this.positions[index + 1] = miny;     this.positions[index + 2] = minx;     this.positions[index + 3] = 1.0;
    this.positions[index + 4] = maxx;   this.positions[index + 5] = maxy;     this.positions[index + 6] = minz;     this.positions[index + 7] = 1.0;
    this.positions[index + 8] = maxx;   this.positions[index + 9] = miny;     this.positions[index + 10] = minz;     this.positions[index + 11] = 1.0;
    this.positions[index + 12] = minx;   this.positions[index + 13] = miny;     this.positions[index + 14] = minz;     this.positions[index + 15] = 1.0;
    this.positions[index + 16] = minx;   this.positions[index + 17] = maxy;     this.positions[index + 18] = minz;     this.positions[index + 19] = 1.0;
    this.positions[index + 20] = maxx;   this.positions[index + 21] = maxy;     this.positions[index + 22] = minz;     this.positions[index + 23] = 1.0;

    this.normals[index] = 0.0;          this.normals[index + 1] = 0.0;        this.normals[index + 2] = 1.0;        this.normals[index + 3] = 0.0;
    this.normals[index + 4] = 0.0;      this.normals[index + 5] = 0.0;        this.normals[index + 6] = 1.0;        this.normals[index + 7] = 0.0;
    this.normals[index + 8] = 0.0;      this.normals[index + 9] = 0.0;        this.normals[index + 10] = 1.0;        this.normals[index + 11] = 0.0;
    this.normals[index + 12] = 0.0;      this.normals[index + 13] = 0.0;        this.normals[index + 14] = 1.0;        this.normals[index + 15] = 0.0;
    this.normals[index + 16] = 0.0;      this.normals[index + 17] = 0.0;        this.normals[index + 18] = 1.0;        this.normals[index + 19] = 0.0;
    this.normals[index + 20] = 0.0;      this.normals[index + 21] = 0.0;        this.normals[index + 22] = 1.0;        this.normals[index + 23] = 0.0;

    this.indicies[start] = start;           this.indicies[start + 1] = start + 1;         this.indicies[start + 2] = start + 2;       
    this.indicies[start + 3] = start + 3;   this.indicies[start + 4] = start + 4;         this.indicies[start + 5] = start + 5;  

    index = index + 24;
    start = start + 6

    //right face
    this.positions[index] = maxx;       this.positions[index + 1] = miny;     this.positions[index + 2] = maxz;     this.positions[index + 3] = 1.0;
    this.positions[index + 4] = maxx;   this.positions[index + 5] = miny;     this.positions[index + 6] = minz;     this.positions[index + 7] = 1.0;
    this.positions[index + 8] = maxx;   this.positions[index + 9] = maxy;     this.positions[index + 10] = maxz;     this.positions[index + 11] = 1.0;
    this.positions[index + 12] = maxx;   this.positions[index + 13] = maxy;     this.positions[index + 14] = maxz;     this.positions[index + 15] = 1.0;
    this.positions[index + 16] = maxx;   this.positions[index + 17] = miny;     this.positions[index + 18] = minz;     this.positions[index + 19] = 1.0;
    this.positions[index + 20] = maxx;   this.positions[index + 21] = maxy;     this.positions[index + 22] = minz;     this.positions[index + 23] = 1.0;

    this.normals[index] = 1.0;          this.normals[index + 1] = 0.0;        this.normals[index + 2] = 0.0;        this.normals[index + 3] = 0.0;
    this.normals[index + 4] = 1.0;      this.normals[index + 5] = 0.0;        this.normals[index + 6] = 0.0;        this.normals[index + 7] = 0.0;
    this.normals[index + 8] = 1.0;      this.normals[index + 9] = 0.0;        this.normals[index + 10] = 0.0;        this.normals[index + 11] = 0.0;
    this.normals[index + 12] = 1.0;      this.normals[index + 13] = 0.0;        this.normals[index + 14] = 0.0;        this.normals[index + 15] = 0.0;
    this.normals[index + 16] = 1.0;      this.normals[index + 17] = 0.0;        this.normals[index + 18] = 0.0;        this.normals[index + 19] = 0.0;
    this.normals[index + 20] = 1.0;      this.normals[index + 21] = 0.0;        this.normals[index + 22] = 0.0;        this.normals[index + 23] = 0.0;

    this.indicies[start] = start;           this.indicies[start + 1] = start + 1;         this.indicies[start + 2] = start + 2;       
    this.indicies[start + 3] = start + 3;   this.indicies[start + 4] = start + 4;         this.indicies[start + 5] = start + 5;  

    index = index + 24;
    start = start + 6

    //top face
    this.positions[index] = minx;       this.positions[index + 1] = maxy;     this.positions[index + 2] = maxz;     this.positions[index + 3] = 1.0;
    this.positions[index + 4] = maxx;   this.positions[index + 5] = maxy;     this.positions[index + 6] = maxz;     this.positions[index + 7] = 1.0;
    this.positions[index + 8] = maxx;   this.positions[index + 9] = maxy;     this.positions[index + 10] = minz;     this.positions[index + 11] = 1.0;
    this.positions[index + 12] = minx;   this.positions[index + 13] = maxy;     this.positions[index + 14] = maxz;     this.positions[index + 15] = 1.0;
    this.positions[index + 16] = maxx;   this.positions[index + 17] = maxy;     this.positions[index + 18] = minz;     this.positions[index + 19] = 1.0;
    this.positions[index + 20] = minx;   this.positions[index + 21] = maxy;     this.positions[index + 22] = minz;     this.positions[index + 23] = 1.0;

    this.normals[index] = 0.0;          this.normals[index + 1] = 1.0;        this.normals[index + 2] = 0.0;        this.normals[index + 3] = 0.0;
    this.normals[index + 4] = 0.0;      this.normals[index + 5] = 1.0;        this.normals[index + 6] = 0.0;        this.normals[index + 7] = 0.0;
    this.normals[index + 8] = 0.0;      this.normals[index + 9] = 1.0;        this.normals[index + 10] = 0.0;        this.normals[index + 11] = 0.0;
    this.normals[index + 12] = 0.0;      this.normals[index + 13] = 1.0;        this.normals[index + 14] = 0.0;        this.normals[index + 15] = 0.0;
    this.normals[index + 16] = 0.0;      this.normals[index + 17] = 1.0;        this.normals[index + 18] = 0.0;        this.normals[index + 19] = 0.0;
    this.normals[index + 20] = 0.0;      this.normals[index + 21] = 1.0;        this.normals[index + 22] = 0.0;        this.normals[index + 23] = 0.0;

    this.indicies[start] = start;           this.indicies[start + 1] = start + 1;         this.indicies[start + 2] = start + 2;       
    this.indicies[start + 3] = start + 3;   this.indicies[start + 4] = start + 4;         this.indicies[start + 5] = start + 5;  

    index = index + 24;
    start = start + 6

    //bot face
    this.positions[index] = minx;       this.positions[index + 1] = miny;     this.positions[index + 2] = maxz;     this.positions[index + 3] = 1.0;
    this.positions[index + 4] = maxx;   this.positions[index + 5] = miny;     this.positions[index + 6] = minz;     this.positions[index + 7] = 1.0;
    this.positions[index + 8] = maxx;   this.positions[index + 9] = miny;     this.positions[index + 10] = maxz;     this.positions[index + 11] = 1.0;
    this.positions[index + 12] = minx;   this.positions[index + 13] = miny;     this.positions[index + 14] = maxz;     this.positions[index + 15] = 1.0;
    this.positions[index + 16] = minx;   this.positions[index + 17] = miny;     this.positions[index + 18] = minz;     this.positions[index + 19] = 1.0;
    this.positions[index + 20] = maxx;   this.positions[index + 21] = miny;     this.positions[index + 22] = minz;     this.positions[index + 23] = 1.0;

    this.normals[index] = 0.0;          this.normals[index + 1] = 1.0;        this.normals[index + 2] = 0.0;        this.normals[index + 3] = 0.0;
    this.normals[index + 4] = 0.0;      this.normals[index + 5] = 1.0;        this.normals[index + 6] = 0.0;        this.normals[index + 7] = 0.0;
    this.normals[index + 8] = 0.0;      this.normals[index + 9] = 1.0;        this.normals[index + 10] = 0.0;        this.normals[index + 11] = 0.0;
    this.normals[index + 12] = 0.0;      this.normals[index + 13] = 1.0;        this.normals[index + 14] = 0.0;        this.normals[index + 15] = 0.0;
    this.normals[index + 16] = 0.0;      this.normals[index + 17] = 1.0;        this.normals[index + 18] = 0.0;        this.normals[index + 19] = 0.0;
    this.normals[index + 20] = 0.0;      this.normals[index + 21] = 1.0;        this.normals[index + 22] = 0.0;        this.normals[index + 23] = 0.0;

    this.indicies[start] = start;           this.indicies[start + 1] = start + 1;         this.indicies[start + 2] = start + 2;       
    this.indicies[start + 3] = start + 3;   this.indicies[start + 4] = start + 4;         this.indicies[start + 5] = start + 5;  

    this.index = index + 24;
    this.start = start + 6

  }
}
