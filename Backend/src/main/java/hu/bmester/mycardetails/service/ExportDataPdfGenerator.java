package hu.bmester.mycardetails.service;

import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import hu.bmester.mycardetails.model.Cost;
import lombok.Setter;

import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.*;
import java.net.URL;
import java.nio.file.Files;
import java.sql.Array;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Setter
public class ExportDataPdfGenerator {
    private List<Cost> costList;
    public byte[] generate(String numberplate) throws FileNotFoundException, IOException {
        Document document = new Document(PageSize.A4.rotate());
        File temp = new File(numberplate + ".pdf");
        FileOutputStream fout = new FileOutputStream(temp);
        PdfWriter.getInstance(document, fout);
        Phrase f = new Phrase("Készült: MyCarDetails - " + new SimpleDateFormat("yyyy.MM.dd. HH:mm:ss").format(new Date()));
        f.setFont(new Font(Font.TIMES_ROMAN, 4, Font.NORMAL));
        HeaderFooter footer = new HeaderFooter(f,false);
        footer.setBorder(Rectangle.NO_BORDER);
        document.setFooter(footer);
        document.open();
        URL font_path = Thread.currentThread().getContextClassLoader().getResource("times.ttf");
        FontFactory.register(font_path.toString(), "Times_Own");
        Font font = FontFactory.getFont("Times_Own", "Cp1250", true);
        font.setSize(15);
        Paragraph paragraph = new Paragraph(numberplate, font);
        paragraph.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(paragraph);
        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100f);
        table.setWidths(new int[] { 1, 1, 5, 2, 2 });
        table.setSpacingBefore(5);
        PdfPCell cell = new PdfPCell();
        //cell.setBackgroundColor(Color.LIGHT_GRAY);
        cell.setBackgroundColor(Color.decode("#B6E388"));
        cell.setPadding(5);
        font.setColor(Color.BLACK);
        cell.setPhrase(new Phrase("Dátum", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Kategória", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Megnevezés", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Összeg", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Kilométeróra állása", font));
        table.addCell(cell);
        font = FontFactory.getFont("Times_Own", "Cp1250", true);
        cell = new PdfPCell();
        for (Cost cost : costList) {
            if(cost.getType().getName().equals("üzemanyag")) {
                continue;
            }
            cell.setPhrase(new Phrase(getValue(new SimpleDateFormat("yyyy.MM.dd.").format(new Date(cost.getDate().getTime()))),font));
            table.addCell(cell);
            cell.setPhrase(new Phrase(getValue(cost.getType().getName()),font));
            table.addCell(cell);
            cell.setPhrase(new Phrase(getValue(cost.getTitle()),font));
            table.addCell(cell);
            cell.setPhrase(new Phrase(getValue(String.valueOf(cost.getPrice()),"Ft"),font));
            table.addCell(cell);
            cell.setPhrase(new Phrase(getValue(String.valueOf(cost.getMileage()),"km"),font));
            table.addCell(cell);
        }
        document.add(table);
        font.setSize(8);
        document.close();
        byte[] ret = Files.readAllBytes(temp.toPath());
        temp.delete();
        return ret;
    }
    private String getValue(String data) {
        return getValue(data, "");
    }
    private String getValue(String data, String unit) {
        if(data != null && !data.equals("null") && data.length() > 0) {
            return data + " " + unit;
        }
        return "";
    }
}
