import { Mat3, Mat4, Vec3, Vec4 } from "../lib/TSM.js";

/* A potential interface that students should implement */
interface IFloor {
  normalsFlat(): Float32Array;
  indicesFlat(): Uint32Array;
  positionsFlat(): Float32Array;
}

export class Floor implements IFloor {
    private dist: number = 500.0;
    private dy: number = -2.0

    constructor() { }

    /* Returns a flat Float32Array of the floor's vertex positions */
    public positionsFlat(): Float32Array {
        return new Float32Array([
            -this.dist, this.dy, -this.dist, 1.0,
            -this.dist, this.dy, this.dist, 1.0,
            this.dist, this.dy, -this.dist, 1.0,

            this.dist, this.dy, this.dist, 1.0,
            this.dist, this.dy, -this.dist, 1.0,
            -this.dist, this.dy, this.dist, 1.0
        ]);
    }

    /**
     * Returns a flat Uint32Array of the floor's face indices
     */
    public indicesFlat(): Uint32Array {
        return new Uint32Array([0, 1, 2, 3, 4, 5]);
    }

    /**
     * Returns a flat Float32Array of the floor's normals
     */
    public normalsFlat(): Float32Array {
        return new Float32Array([
            0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,

            0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0
        ]);
    }  

    /**
     * Returns the model matrix of the sponge
     */
    public uMatrix(): Mat4 {
        const ret : Mat4 = new Mat4().setIdentity();
        return ret;    
    }
}
