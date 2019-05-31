Это сборка на основе gulp 3.9.1

Всё что необходимо сделать просто скачать ,
зайти в терминал из папки      => npm install и все зависимости установятся.
Папка developer служит для разработки а production для готовых файлов котороые необходимо затестить и отправить заказчику или дальше по линии.
Если что,то в .gitignore находится node_modules и package-lock.json.
Теперь про плагины             => все плагины скачаны и установлены в соответствии инструкции на официальном сайте:
                                  ( https://www.npmjs.com/ , а именно: https://gulpjs.com/plugins/ ) ,
                                   все плагины можно там же и посмотреть и использовать в отдельных проектах для себя по инструкциям ,
                                   конечно все названия плагинов оригинальные а имена присвоения такие как мне удобно ,
возможные кое-какие правки     => добавленны названия для отображения названий файлов,которые взвешиваются ;
                                  передается require в функцию закрытую самовызовом внутрь как r ;
                                  структура подогнана под последний стандарт джс es6 ;
                                  для препроцессора использована SCSS ;

Плагин gulp-sourcemaps весьма странный так как добавляет весу в два раза файлу от исходного , он закоментирован:

gulp-sourcemaps              => 


Плагины общие:

gulp-watch                   => для того чтоб запускались задания после изменений в файлах которые мы сделали,чтоб каждый раз  не писать команды вручную ;
gulp-plumber                 => для того чтоб не сбрасывал работу галп при ошибке в синтаксе кода , выводит описания этих ошибок в консоль,
                                начитал что есть и другие плагины заменяющие или помогающие(исправляют сами ошибки в коде)-но мне показолось это уже излишеством ,
                                еще пишут ,что есть плагины которые делают эти выводы ошибок разноцветными)) ;
gulp-size                    => крутой и мне кажется полезный для того чтоб видно было какой размер файла до и после операции
                                ( и этот единственный из анологичных что у меня работает корректно ) ;
gulp-changed                 => он смотрит на файл-запоминает-если изменения в этом файле ,
                                значит включает его в операцию ,если изменения не в этом файле то не трогает его 
                                -> сокращает скорость и напряжение на галп , 
                                ( пример: у вас две картинки и вы добавляете третию и галп не сжимает заново все три ,
                                а только одну которую добавили! согласитесь это чудо)) ! ,
gulp-cache                   => нужен для картинок( .pipe(cache(сюда задачу) ) ) ;
gulp-rigger                  => немного странный , думаю в дальнейшем поскать аналоги или полностью заменить его
                                -> просто переносит файлы из разработки в папку с готовыми файлами ;
gulp-browser-sync            => BrowserSync создает подключение , после чего производит автообновление страницы во всех браузерах 
                                на всех устройствах при изменениями не только клиентских или даже серверных файлов
                                ( думаю что он не очень то и нужен если есть Live Server или чтото подобное в редакторе 
                                ...хотя говорят что можно скинуть ссылку сгенерируемую самим плагином на другому человеку 
                                и он будет видеть на экране то что и вы ,или на другое устройство) ;


Плагины для css:

gulp-sass                    => надеюсь его знают все)-ну на всяк -> для коомпиляции .scss в .css ;
gulp-autoprefixer            => тоже знаменит -> расставляет 'вендоры' в .css ;
gulp-group-css-media-queries => для расстановк медиазапросов как в обычном .css -> пишут что влияет на скорость работы самого сайта , 
                                ( без него после коомпиляции медиазапросы разбросаны по всему .css после каждого правила к котрому приписали ) ;
gulp-uncss                   =>  просматривает ваш .html и выбирает из всех .css используемые классы , а остальные просто удаляет! включая ненужные стили сторонних .css типа bootstrap ;
gulp-clean-css               => сжимает .css ->мне показалось одной из самых простых и удобных ;


Плагины для html:

gulp-file-include            => для структуры html , как в .sccs работает с помощью настраиваемых инклюков -> удобно просто так
                                и для верстки для CMS систем так как просто структурируешь так как удобно для переноски на CMS ;
gulp-htmlnano                => сжимает .html ;


Плагины для js:

gulp-concat                  => для соединения .js ( вероятно возможно использовать для .css ,но зачем ) ,просто берет файлы соединяет в один ,конечно структуру можно любую ;
gulp-babel                   => необходимый коомпилятор для .js делает ваш код ES^6 вылидным для разных браузеров и версий 
                                ( у меня вылезла ошибка что сломано ядро @babel и мне помогло это -> npm install --save-dev @babel/core @babel/preset-env )
                                -> еще заметил странную штуку - зачем-то для преобразования js к gulp добавляют webpack , но у меня вроде и так работает...будем проверять ;
gulp-uglify                  => сжимает .js ;


Плагины для img:

gulp-imagemin                => сжимает изображений .png , .jpg , .gif и .svg ( пишут что есть еще аналоги или даже встроенные как дополнения , 
                                которые можно использовать imagemin-pngquant или gulp-tinypng ,
                                но и этот плагин сжимает на разницу не замерял ) ;
gulp-webp                    => для преобразования в новый-современный формат WebP для googlespeed ;


Дополнительные не установленные и не проверенные:


gulp-svg-sprite              => для создания спрайтов ;
gulp-spritesmith             => тоже для спрайтов ;
gulp-email-design            => для преобразования ваших стилей из .css в инлайновые ,автоматически изменяя все пути к файлам ,
                                опционально умеет загружать изображения на CDN и даже отсылать письма на почту ;
gulp-plato                   => предоставляет аналитику по вашему коду с разными метриками в виде красивых графиков ;
gulp-jscpd                   => для поиска дубликатов в коде ;
gulp-iconfont                => плагин для работы с веб-шрифтами . Умеет создавать .woff , .woff2 , .eot , .ttf файлы из .svg и других . 


P.S.                         => сначала надо установить ноду nodejs.org . Конечно всё дорабатывается и будет дорабатываться дальше ,
                                установка на моей системе занимает около четверти минуты , также с первым запуском .