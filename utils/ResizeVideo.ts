import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

const resizeVideo = async (videoURL: string, out_w: number, out_h: number, x_offset: number  ) => {
  const isLoaded = ffmpeg.isLoaded()
  if (!isLoaded){
    await ffmpeg.load();
  }
  ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(`${process.env.NEXT_PUBLIC_CORS}/${videoURL}`));
  await ffmpeg.run('-i', 'video.mp4', '-filter:v', "crop=" + out_w + ':' + out_h + `:${x_offset}:0`, 'output.mp4')
  const data = ffmpeg.FS('readFile', 'output.mp4');
  const src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  return src
}
export default resizeVideo