import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const Images = () => {
  return app.gulp.src(app.path.src.Images)
    .pipe(app.plugins.gulpPlumber(
      app.plugins.notify.onError({
        title: "Images",
        message: "Error:<%= error.message %>"
      })
    ))
    .pipe(app.plugins.newer(app.path.build.Images))
    .pipe(
      app.plugins.if(
        app.isBuild,
        webp()
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.gulp.dest(app.path.build.Images)
      )
    )

    .pipe(
      app.plugins.if(
        app.isBuild,
        app.gulp.src(app.path.src.Images)
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.plugins.newer(app.path.build.Images)
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true,
          optimizationLevel: 3,
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.Images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.Images))
    .pipe(app.plugins.browserSync.stream());
}