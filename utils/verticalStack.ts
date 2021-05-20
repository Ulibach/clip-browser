// ffmpeg -i input0.mp4 -i input1.mp4 -filter_complex vstack=inputs=2 vertical-stack-output.mp4

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

const verticalStack = async ( 
    videoURL: string,
    out_w: number,
    x_offset_top: number,
    out_h_top: number,
    x_offset_bottom: number ,
    out_h_bottom: number,
    ) => {
  console.log('starting up fucking ffmpeg...')
  const isLoaded = ffmpeg.isLoaded()
  if (!isLoaded){
    await ffmpeg.load();
  }

  console.log('fetching video...')
  ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(`${process.env.NEXT_PUBLIC_CORS}/${videoURL}`))


  console.log('got video, cropping the top part with this command..')
  console.log('-i', 'video.mp4', '-filter:v', "crop=" + out_w + ':' + out_h_top + `:${x_offset_top}:0`, 'output1.mp4')

  await ffmpeg.run('-i', 'video.mp4', '-filter:v', "crop=" + out_w + ':' + out_h_top + `:${x_offset_top}:0`, 'output1.mp4')

  console.log('cropped the top part, starting to crop the bottom part with this command...')

  await ffmpeg.run('-i', 'video.mp4', '-filter:v', "crop=" + out_w + ':' + out_h_bottom + `:${x_offset_bottom}:${out_h_top}`, 'output2.mp4')

  console.log('cropped the bottom part, now vertically stacking these videos...')

  await ffmpeg.run('-i', 'output1.mp4', '-i', 'output2.mp4', '-filter_complex', 'vstack=inputs=2', 'vertical-stack-output.mp4')

  const data = ffmpeg.FS('readFile', 'vertical-stack-output.mp4');

  const src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  return src
}
export default verticalStack