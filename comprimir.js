import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const directorioFotos = './public/fotos';

fs.readdir(directorioFotos, async (err, files) => {
  if (err) {
    console.error("No se pudo leer la carpeta", err);
    return;
  }

  for (const file of files) {
    // Solo procesamos las que se llaman foto-X.jpeg para evitar tocar el perrito u otros archivos
    if (file.startsWith('foto-') && (file.endsWith('.jpeg') || file.endsWith('.jpg'))) {
      const rutaArchivo = path.join(directorioFotos, file);
      const rutaTemporal = path.join(directorioFotos, `temp_${file}`);
      
      try {
        // Procesamos usando un archivo temporal para evitar conflicto de escritura
        await sharp(rutaArchivo)
          .resize({ width: 1200, withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toFile(rutaTemporal);

        // Reemplazamos el original con el comprimido de forma segura
        fs.unlinkSync(rutaArchivo);
        fs.renameSync(rutaTemporal, rutaArchivo);
        
        console.log(`✅ Comprimida con éxito: ${file}`);
      } catch (error) {
        console.error(`❌ Error con ${file}:`, error.message);
        // Limpiamos el temporal si algo falló
        if (fs.existsSync(rutaTemporal)) fs.unlinkSync(rutaTemporal);
      }
    }
  }
  console.log("¡Proceso de compresión finalizado sin errores de bloqueo!");
});