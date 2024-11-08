<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>CRUD con Node.js y MySQL</title>
    <script>
        function loadUserData(cedula, nombres, apellidos, fechaNacimiento, correo) {
            document.getElementById('updateCedula').value = cedula;
            document.getElementById('updateNombres').value = nombres;
            document.getElementById('updateApellidos').value = apellidos;
            document.getElementById('updateFechaDeNacimiento').value = fechaNacimiento;
            document.getElementById('updateCorreo').value = correo;
        }
    </script>
</head>
<body>
    <h1>Gestión de Usuarios</h1>

    <!-- Formulario para agregar usuario -->
    <form action="/add-user" method="POST">
        <input type="text" name="Cedula" placeholder="Cédula" required>
        <input type="text" name="Nombres" placeholder="Nombres" required>
        <input type="text" name="Apellidos" placeholder="Apellidos" required>
        <input type="date" name="FechaDeNacimiento" required>
        <input type="email" name="Correo" placeholder="Correo Electrónico" required>
        <input type="password" name="Contraseña" placeholder="Contraseña" required>
        <button type="submit">Agregar Usuario</button>
    </form>

    <!-- Tabla para mostrar usuarios -->
    <table border="1">
        <thead>
            <tr>
                <th>Cédula</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Fecha de Nacimiento</th>
                <th>Correo Electrónico</th>
                <th>Contraseña</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <% users.forEach(user => { %>
            <tr>
                <td><%= user.Cedula %></td>
                <td><%= user.Nombres %></td>
                <td><%= user.Apellidos %></td>
                <td><%= user.FechaDeNacimiento %></td>
                <td><%= user.Correo %></td>
                <td>******</td> <!-- Oculta la contraseña -->
                <td>
                    <!-- Botón de edición -->
                    <button type="button" onclick="loadUserData('<%= user.Cedula %>', '<%= user.Nombres %>', '<%= user.Apellidos %>', '<%= user.FechaDeNacimiento %>', '<%= user.Correo %>')">Editar</button>
                    
                    <!-- Botón de eliminación -->
                    <a href="/delete-user/<%= user.Cedula %>" onclick="return confirm('¿Estás seguro de eliminar este usuario?')">Eliminar</a>
                </td>
            </tr>
            <% }) %>
        </tbody>
    </table>

    <!-- Formulario de actualización separado -->
    <h2>Actualizar Usuario</h2>
    <form action="/update-user" method="POST">
        <input type="hidden" id="updateCedula" name="Cedula" required>
        <input type="text" id="updateNombres" name="Nombres" placeholder="Nombres" required>
        <input type="text" id="updateApellidos" name="Apellidos" placeholder="Apellidos" required>
        <input type="date" id="updateFechaDeNacimiento" name="FechaDeNacimiento" required>
        <input type="email" id="updateCorreo" name="Correo" placeholder="Correo Electrónico" required>
        <input type="password" id="updateContraseña" name="Contraseña" placeholder="Nueva Contraseña">
        <button type="submit">Actualizar Usuario</button>
    </form>
</body>
</html>
