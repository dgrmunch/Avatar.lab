
//--------------------------------------------------
//
//  AMMO WORLD
//
//--------------------------------------------------

var world = null;
var worldInfo = null;
var solver, solverSoft, collision, dispatcher, broadphase;

function clearWorld () {

    //world.getBroadphase().resetPool( world.getDispatcher() );
    //world.getConstraintSolver().reset();

    Ammo.destroy( world );
    Ammo.destroy( solver );
    Ammo.destroy( solverSoft );
    Ammo.destroy( collision );
    Ammo.destroy( dispatcher );
    Ammo.destroy( broadphase );

    world = null;

};

function addWorld () {

    Ammo.btRigidBody.prototype.getContact = function(){ return this.cc; }
    //Ammo.btRigidBody.prototype.getContact = function(){ return this.cc; }

    //Ammo.btRigidBody.prototype.setName = function(name){ this.name = name; }
    //Ammo.btRigidBody.prototype.getName = function(){ return this.name; }

    if( world !== null ) return;

    solver = new Ammo.btSequentialImpulseConstraintSolver();
    solverSoft = new Ammo.btDefaultSoftBodySolver();

    collision = new Ammo.btDefaultCollisionConfiguration();
    //collision = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();

    dispatcher = new Ammo.btCollisionDispatcher( collision );

    

    var type = 3;
    
    switch( type ){

        //case 1: broadphase = new Ammo.btSimpleBroadphase(); break;
        case 2: 
            var s = 1000;
            tmpPos.setValue(-s,-s,-s);
            tmpPos1.setValue(s,s,s);
            broadphase = new Ammo.btAxisSweep3( tmpPos, tmpPos1, 4096 ); 
        break;//16384;
        case 3: broadphase = new Ammo.btDbvtBroadphase(); break;
        
    }

    world = new Ammo.btDiscreteDynamicsWorld( dispatcher, broadphase, solver, collision );
    //world = new Ammo.btSoftRigidDynamicsWorld( dispatcher, broadphase, solver, collision, solverSoft );

    gravity.setValue( 0, -9.8, 0 );
    world.setGravity( gravity );

    

    //worldInfo = world.getWorldInfo();

    //worldInfo.set_m_gravity( gravity );
    //worldInfo.set_air_density( 1.2 );
    //worldInfo.set_water_density( 0 );
    //worldInfo.set_water_offset( 0 );
    //worldInfo.set_water_normal( vec3() );

   // console.log(world);
};

function gravity ( o ) {

    gravity.fromArray(o.g);
    world.setGravity( gravity );
    worldInfo.set_m_gravity( gravity );

};

function stepContact(){

    //var dispatch = world.getDispatcher()

    var i, c, a, b, n;

    collisionPtr = [];

    i = dispatcher.getNumManifolds();
    while(i--){
    //var lng = dispatcher.getNumManifolds();
    //for(i = 0; i < lng; i++){

        c = dispatcher.getManifoldByIndexInternal(i);
        a = c.getBody0().ptr;
        b = c.getBody1().ptr;
        n = c.getNumContacts();

        //if( a.ptr === ballptr && n>0 ) collisionPtr.push(b.ptr);//console.log(a, b);
        //if( b.ptr === ballptr && n>0 ) collisionPtr.push(a.ptr);//console.log(a, b)

        if( n > 0 ){
            if( ballptr.indexOf(a) !== -1 && collisionPtr.indexOf(b) === -1 ) collisionPtr.push( b );
            if( ballptr.indexOf(b) !== -1 && collisionPtr.indexOf(a) === -1 ) collisionPtr.push( a );
        }

    }

}


function testContactPair( b, name, callback ){

    if(world.contactPairTest( b, getByName(name))) return 1;//, function(){return 1;} );
    return 0;

    //return world.contactTest( getByName(name1), getByName(name2) )

}
function testContact( b, callback){

    world.contactTest( b, contactor );//return 1;//, callback );
    //else return 0;

    //return world.contactTest( getByName(name1), getByName(name2) )

}

function contactor( e ){

    console.log(e)



    //if( world.contactTest( b )) return 1;//, callback );
    //else return 0;

    //return world.contactTest( getByName(name1), getByName(name2) )

}