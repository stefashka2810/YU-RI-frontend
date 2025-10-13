'use client'
import Image from 'next/image';
import { useState, DragEvent, useEffect } from 'react';
import mammoth from 'mammoth';

interface DocumentEditorProps {
    file: File | null;
    onClose: () => void;
    onFileSelect: (file: File) => void;
}


export const Editor = () => {
    const [fontSize, setFontSize] = useState('12');
    const [fontFamily, setFontFamily] = useState('Montserrat');

    return (
        <div className='flex flex-col w-[13.5vw] h-[7vw] bg-transparent'>
            {/* Панель инструментов */}
            <div className='flex flex-col gap-[0.5vw] p-[1vw] '>
                {/* Первая строка: шрифт и размер */}
                <div className='flex flex-row gap-[0.5vw]'>
                    <select
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        className='bg-transparent border border-[#FFFFFFCC] rounded-[4px] text-white px-[1vw] py-[0.4vw] text-[0.8vw] min-w-[10vw]'
                    >
                        <option value="Montserrat" className='bg-black'>Montserrat</option>
                        <option value="Arial" className='bg-black'>Arial</option>
                        <option value="Times New Roman" className='bg-black'>Times New Roman</option>
                    </select>
                    <select
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        className='bg-transparent border border-[#FFFFFFCC] rounded-[4px] text-white px-[0.8vw] py-[0.4vw] text-[0.8vw] min-w-[4vw]'
                    >
                        <option value="10" className='bg-black'>10</option>
                        <option value="12" className='bg-black'>12</option>
                        <option value="14" className='bg-black'>14</option>
                        <option value="16" className='bg-black'>16</option>
                        <option value="18" className='bg-black'>18</option>
                        <option value="20" className='bg-black'>20</option>
                    </select>
                </div>

                {/* Вторая строка: форматирование текста */}
                <div className='flex flex-row gap-[0.5vw]'>
                    <div className='flex flex-row border border-[#FFFFFFCC] rounded-[4px]'>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors border-r border-[#FFFFFF33]'>
                            <Image src='/editorImages/bold.png' alt='bold' width={24} height={24} />
                        </button>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors border-r border-[#FFFFFF33]'>
                            <Image src='/editorImages/italic.png' alt='italic' width={24} height={24} />
                        </button>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors border-r border-[#FFFFFF33]'>
                            <Image src='/editorImages/underline.png' alt='underline' width={24} height={24} />
                        </button>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors border-r border-[#FFFFFF33]'>
                            <Image src='/editorImages/strikethrough.png' alt='strikethrough' width={24} height={24} />
                        </button>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors'>
                            <Image src='/editorImages/type.png' alt='type' width={24} height={24} />
                        </button>
                    </div>

                    <div className='flex flex-row border border-[#FFFFFFCC] rounded-[4px]'>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors border-r border-[#FFFFFF33]'>
                            <Image src='/editorImages/align-left.png' alt='align-left' width={24} height={24} />
                        </button>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors border-r border-[#FFFFFF33]'>
                            <Image src='/editorImages/align-center.png' alt='align-center' width={24} height={24} />
                        </button>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors'>
                            <Image src='/editorImages/align-right.png' alt='align-right' width={24} height={24} />
                        </button>
                    </div>
                </div>

                {/* Третья строка: дополнительные функции */}
                <div className='flex flex-row gap-[0.5vw]'>
                    <div className='flex flex-row border border-[#FFFFFFCC] rounded-[4px]'>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors border-r border-[#FFFFFF33]'>
                            <Image src='/editorImages/list.png' alt='list' width={24} height={24} />
                        </button>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors'>
                            <Image src='/editorImages/numberedList.png' alt='numberedList' width={24} height={24} />
                        </button>
                    </div>

                    <div className='flex flex-row border border-[#FFFFFFCC] rounded-[4px]'>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors border-r border-[#FFFFFF33]'>
                            <Image src='/editorImages/link-2.png' alt='link' width={24} height={24} />
                        </button>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors border-r border-[#FFFFFF33]'>
                            <Image src='/editorImages/image.png' alt='image' width={24} height={24} />
                        </button>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors border-r border-[#FFFFFF33]'>
                            <Image src='/editorImages/youtube.png' alt='youtube' width={24} height={24} />
                        </button>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors'>
                            <Image src='/editorImages/code.png' alt='code' width={24} height={24} />
                        </button>
                    </div>

                    <div className='flex flex-row border border-[#FFFFFFCC] rounded-[4px]'>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors border-r border-[#FFFFFF33]'>
                            <Image src='/editorImages/S2.png' alt='superscript' width={24} height={24} />
                        </button>
                        <button className='p-[0.7vw] hover:bg-[#FFFFFF1A] transition-colors'>
                            <Image src='/editorImages/S2 (1).png' alt='subscript' width={24} height={24} />
                        </button>
                    </div>
                </div>
            </div>

            
        </div>
    );
}

const DocumentEditor = ({ file, onClose, onFileSelect }: DocumentEditorProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [csvData, setCsvData] = useState<string[][] | null>(null);
    const [textContent, setTextContent] = useState<string | null>(null);
    const [docxHtml, setDocxHtml] = useState<string | null>(null);

    // Создаем URL для просмотра файла
    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setFileUrl(url);

            // Если это CSV, парсим его
            if (file.name.endsWith('.csv')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const text = e.target?.result as string;
                    const rows = text.split('\n').map(row => row.split(','));
                    setCsvData(rows);
                };
                reader.readAsText(file);
            }

            // Если это DOCX, конвертируем в HTML с помощью mammoth
            if (file.name.endsWith('.docx')) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const arrayBuffer = e.target?.result as ArrayBuffer;
                    try {
                        const result = await mammoth.convertToHtml({ arrayBuffer });
                        setDocxHtml(result.value);
                    } catch (error) {
                        console.error('Ошибка при чтении DOCX:', error);
                    }
                };
                reader.readAsArrayBuffer(file);
            }

            // Если это текстовый файл, читаем содержимое
            if (file.type.startsWith('text/') || file.name.endsWith('.txt')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setTextContent(e.target?.result as string);
                };
                reader.readAsText(file);
            }

            return () => {
                URL.revokeObjectURL(url);
                setFileUrl(null);
                setCsvData(null);
                setTextContent(null);
                setDocxHtml(null);
            };
        }
    }, [file]);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            onFileSelect(droppedFile);
        }
    };


    return (
        <div className="w-full h-full bg-[#FFFFFF33] flex flex-col overflow-hidden">
            
            {/* Контент документа */}
            <div className="flex-1 overflow-hidden">
                {file ? (
                    // Если файл прикреплен - показываем его в полноэкранном режиме
                    <div className="w-full h-full">
                        {file.type.startsWith('image/') ? (
                            // Изображение
                            <div className="w-full h-full flex items-center justify-center bg-[#0A0A0A] rounded-[10px] overflow-hidden">
                                <img 
                                    src={fileUrl || ''} 
                                    alt={file.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ) : file.type === 'application/pdf' ? (
                            // PDF - открываем в iframe
                            <iframe
                                src={fileUrl || ''}
                                className="w-full h-full rounded-[10px] bg-white"
                                title={file.name}
                            />
                        ) : file.name.endsWith('.csv') && csvData ? (
                            // CSV - показываем таблицу
                            <div className="w-full h-full overflow-auto bg-white rounded-[10px] p-[1vw]">
                                <table className="w-full border-collapse">
                                    <tbody>
                                        {csvData.map((row, rowIndex) => (
                                            <tr key={rowIndex} className={rowIndex === 0 ? 'bg-gray-100 font-semibold' : ''}>
                                                {row.map((cell, cellIndex) => (
                                                    <td 
                                                        key={cellIndex}
                                                        className="border border-gray-300 px-[0.5vw] py-[0.3vw] text-[0.75vw] text-black"
                                                    >
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : file.name.endsWith('.docx') && docxHtml ? (
                            // DOCX - отображаем конвертированный HTML
                            <div className="w-full h-full overflow-auto bg-white rounded-[10px] p-[2vw]">
                                <div 
                                    className="text-black prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: docxHtml }}
                                    style={{
                                        fontSize: '0.9vw',
                                        lineHeight: '1.6',
                                    }}
                                />
                            </div>
                        ) : file.name.endsWith('.doc') ? (
                            // DOC (старый формат) - показываем через iframe
                            <div className="w-full h-full flex flex-col">
                                <iframe
                                    src={fileUrl || ''}
                                    className="w-full h-full rounded-[10px] bg-white"
                                    title={file.name}
                                />
                            </div>
                        ) : textContent ? (
                            // Текстовые файлы
                            <div className="w-full h-full overflow-auto bg-white rounded-[10px] p-[1.5vw]">
                                <pre className="text-[0.8vw] text-black whitespace-pre-wrap font-mono">
                                    {textContent}
                                </pre>
                            </div>
                        ) : (
                            // Для других файлов показываем информацию
                            <div className="w-full h-full flex flex-col items-center justify-center gap-[1vw] text-white bg-[#0A0A0A] rounded-[10px]">
                                <Image 
                                    src='/chatImages/FileIcon.png' 
                                    alt='file' 
                                    width={80} 
                                    height={80}
                                />
                                <p className="text-[1vw] font-medium">{file.name}</p>
                                <p className="text-[0.8vw] text-gray-400">
                                    {(file.size / 1024).toFixed(2)} KB
                                </p>
                                <p className="text-[0.75vw] text-gray-500 mt-[1vw] text-center max-w-[80%]">
                                    Файл готов к отправке
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    // Если файла нет - показываем дроп-зону
                    <div className="w-full h-full p-[1.5vw]">
                        <div 
                            className={`w-full h-full flex flex-col items-center justify-center rounded-[15px] transition-colors ${
                                isDragging 
                                    ? 'bg-[#FFFFFF0A]' 
                                    : 'border-[#FFFFFF33] hover:border-[#FFFFFF66]'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            
                            <p className="text-[#FFFFFFCC] text-[1vw] mt-[1.5vw]">
                                Выберите документ или прикрепите его сюда
                            </p>
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};



export default DocumentEditor;
