$(document).ready(function()
        {
            // Cuando 'nombre' obtiene el foco
             $("#nombre").focus(function() {
                $("#log").text("El cuadro de texto 'nombre' ha obtenido el foco");
            });
            // Cuando 'nombre' pierde el foco
             $("#nombre").blur(function() {
                $("#log").text("El cuadro de texto ha perdido el foco");
            });
            // Cuando se edita 'apellido1'
             $("#apellido1").change(function() {
                $("#log").text("Se ha modificado el primer apellido");
            });
            // Cuando se selecciona todo o parte del texto en 'apellido1'
             $("#apellido2").select(function() {
                $("#log").text("Se ha seleccionado el texto");
            });
            // Seleccionar el texto de 'nombre'
             $("#btnSeleccionar").click(function() {
                $("#nombre").select();
            });
             $("#form1").submit(function() {
                $("#log").text("Se ha enviado el formulario");
                // Cancelamos el envío
                return false;
            });
        });

