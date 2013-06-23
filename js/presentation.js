var activePageId; 

$(document).on("impress:stepenter", function(){
    console.log("impress:stepenter:" + window.location.hash);
    activePageId = window.location.hash.replace("#/","");
    executePageHandler( activePageId );
})

$(document).on("impress:stepleave", function(){
    console.log("impress:stepleave:" + +window.location.hash);
})

function executePageHandler( pageName ){
    var handler = pageAnimationHandler.getHandler( pageName );
    if( typeof handler === "function" ){
        handler();
    }
}

//page animation handler를 관리하는 object
var pageAnimationHandler = {
    handlers: [],
    getHandler: function( name ){
        return this.handlers[ name ];
    },
    setHandler: function( name, handler ){
        this.handlers[ name ] = handler;
    },
    init: function( handlerObj ){
        for( a in handlerObj ){
            this.handlers[ a ] = handlerObj[a];
        }
    }
}

//page 별 animation hanlder를 기술 후 일괄 등록
pageAnimationHandler.init({
    helloRacer: function(){
        $('#helloRacer iframe').each( function( index, elem ){
            var that = this;
            setTimeout( function(){
                $(that).attr( "src", $( that ).attr( 'data-src') );
            }, 2000);
        });
    },
    bookshelf: function(){
        $('#bookshelf iframe').each( function( index, elem ){
            var that = this;
            setTimeout( function(){
                $(that).attr( "src", $( that ).attr( 'data-src') );
            }, 2000);
        });
        $('#bookshelf .title').off().on('click',function(){
            $('#bookshelf div' ).toggleClass("animating");
            $('#bookshelf .title').html("CSS3D: rotate y축")
        });
    },
    linkedinIssue: function(){
        $('#linkedinIssue img').off().on('click', function(){
            alert("제대로 된 Tool이 없어요!");
        });
    }
});

//display clock
new imageclock.display()