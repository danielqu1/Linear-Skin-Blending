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
  
  constructor(level: number) {
	  this.setLevel(level);
	  // TODO: other initialization	
  }

  /**
   * Returns true if the sponge has changed.
   */
  public isDirty(): boolean {
       return true;
  }

  public setClean(): void {
  }
  
  public setLevel(level: number)
  {
	  // TODO: initialize the cube
    this.level = level;
  }

  /* Returns a flat Float32Array of the sponge's vertex positions */
  public positionsFlat(): Float32Array {
	  // TODO: right now this makes a single triangle. Make the cube fractal instead.
	  // return new Float32Array([1.0, 0.0, 0.0, 1.0, -1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0]);
    return new Float32Array([
      //front face
      0.5, -0.5, -0.5, 1.0,
      -0.5, -0.5, -0.5, 1.0,
      0.5, 0.5, -0.5, 1.0,
      -0.5, 0.5, -0.5, 1.0,
      0.5, 0.5, -0.5, 1.0,
      -0.5, -0.5, -0.5, 1.0,

      //back face
      0.5, -0.5, 0.5, 1.0,
      0.5, 0.5, 0.5, 1.0,
      -0.5, -0.5, 0.5, 1.0,
      -0.5, 0.5, 0.5, 1.0,
      -0.5, -0.5, 0.5, 1.0,
      0.5, 0.5, 0.5, 1.0,
      
      //top face
      0.5, 0.5, -0.5, 1.0,
      -0.5, 0.5, -0.5, 1.0,
      0.5, 0.5, 0.5, 1.0,
      -0.5, 0.5, 0.5, 1.0,
      0.5, 0.5, 0.5, 1.0,
      -0.5, 0.5, -0.5, 1.0,

      //bot face
      0.5, -0.5, -0.5, 1.0,
      0.5, -0.5, 0.5, 1.0,
      -0.5, -0.5, -0.5, 1.0,
      -0.5, -0.5, 0.5, 1.0,
      -0.5, -0.5, -0.5, 1.0,
      0.5, -0.5, 0.5, 1.0,

      //left face
      -0.5, -0.5, 0.5, 1.0,
      -0.5, 0.5, 0.5, 1.0,
      -0.5, -0.5, -0.5, 1.0,
      -0.5, 0.5, -0.5, 1.0,
      -0.5, -0.5, -0.5, 1.0,
      -0.5, 0.5, 0.5, 1.0,

      //right face
      0.5, -0.5, 0.5, 1.0,
      0.5, -0.5, -0.5, 1.0,
      0.5, 0.5, 0.5, 1.0,
      0.5, 0.5, -0.5, 1.0,
      0.5, 0.5, 0.5, 1.0,
      0.5, -0.5, -0.5, 1.0

    ]);
  }

  /**
   * Returns a flat Uint32Array of the sponge's face indices
   */
  public indicesFlat(): Uint32Array {
    // TODO: right now this makes a single triangle. Make the cube fractal instead.
    return new Uint32Array([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]);
  }

  /**
   * Returns a flat Float32Array of the sponge's normals
   */
  public normalsFlat(): Float32Array {
	  // TODO: right now this makes a single triangle. Make the cube fractal instead.
	  return new Float32Array([
      
      //red faces
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 1.0, 0.0,

      0.0, 0.0, -1.0, 0.0,
      0.0, 0.0, -1.0, 0.0,
      0.0, 0.0, -1.0, 0.0,
      0.0, 0.0, -1.0, 0.0,
      0.0, 0.0, -1.0, 0.0,
      0.0, 0.0, -1.0, 0.0,
      
      0.0, -1.0, 0.0, 0.0,
      0.0, -1.0, 0.0, 0.0,
      0.0, -1.0, 0.0, 0.0,
      0.0, -1.0, 0.0, 0.0,
      0.0, -1.0, 0.0, 0.0,
      0.0, -1.0, 0.0, 0.0,

      0.0, 1.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,

      -1.0, 0.0, 0.0, 0.0,
      -1.0, 0.0, 0.0, 0.0,
      -1.0, 0.0, 0.0, 0.0,
      -1.0, 0.0, 0.0, 0.0,
      -1.0, 0.0, 0.0, 0.0,
      -1.0, 0.0, 0.0, 0.0,

      1.0, 0.0, 0.0, 0.0,
      1.0, 0.0, 0.0, 0.0,
      1.0, 0.0, 0.0, 0.0,
      1.0, 0.0, 0.0, 0.0,
      1.0, 0.0, 0.0, 0.0,
      1.0, 0.0, 0.0, 0.0
    
    ]);
  }

  /**
   * Returns the model matrix of the sponge
   */
  public uMatrix(): Mat4 {

    // TODO: change this, if it's useful
    const ret : Mat4 = new Mat4().setIdentity();

    return ret;    
  }
  
}
